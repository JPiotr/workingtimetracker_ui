const ctxSummary = document.querySelector("#summaryCanvas");
const ctxMain = document.querySelector("#mainCanvas");

class Scale {
  divider = 1;
  name = "Milliseconds";
  constructor(divider, name) {
    this.divider = divider;
    this.name = name;
  }
  static Minutes = new Scale(60 * 1000, "Minutes"); //10
  static Hours = new Scale(Scale.Minutes.divider * 60, "Hours");
  static Days = new Scale(Scale.Hours.divider * 24, "Days");
  static Weeks = new Scale(Scale.Days.divider * 7, "Weeks");

  static whichScale(value) {
    if (value < Scale.Minutes.divider) {
      return new Scale(1, "Milliseconds");
    } else if (value >= Scale.Minutes.divider && value < Scale.Hours.divider) {
      return Scale.Minutes;
    } else if (value >= Scale.Hours.divider && value < Scale.Days.divider) {
      return Scale.Hours;
    } else if (value >= Scale.Days.divider && value < Scale.Weeks.divider) {
      return Scale.Days;
    } else if (value > Scale.Weeks.divider) {
      return Scale.Weeks;
    }
  }
}
class ChartUI {
  name = "Base";
  chart;
  manager;
  constructor(name, manager) {
    this.name = name;
    this.manager = manager;
  }
  calculate() {
    console.error("Method not implemented!");
  }
  update() {
    console.error("Method not implemented!");
  }
  load() {
    console.error("Method not implemented!");
  }
  determineScale(data = [1, 2]) {
    const maxValue = Math.max(...data);
    return Scale.whichScale(maxValue);
  }
}
class SummaryChart extends ChartUI {
  idle = 0;
  notIdle = 0;
  constructor(manager) {
    super("Summary Chart", manager);
  }
  calculate(dataFromFile, usersNames) {
    return new Promise((resolve) => {
      this.idle = 0;
      this.notIdle = 0;
      dataFromFile.data.forEach((user) => {
        if (usersNames.length != 0) {
          if (usersNames.includes(user.user)) {
            user.dailySessions.forEach((daily) => {
              daily.sessions.forEach((session) => {
                if (session.actionType == "Idle") {
                  this.idle += session.sessionInfo.idle;
                } else {
                  this.notIdle += session.sessionInfo.duration;
                  this.idle +=
                    session.sessionInfo.idle - session.sessionInfo.duration;
                }
              });
            });
          }
        } else {
          user.dailySessions.forEach((daily) => {
            daily.sessions.forEach((session) => {
              if (session.actionType == "Idle") {
                this.idle += session.sessionInfo.idle;
              } else {
                this.notIdle += session.sessionInfo.duration;
                this.idle +=
                  session.sessionInfo.idle - session.sessionInfo.duration;
              }
            });
          });
        }
      });
      let scale = this.determineScale([this.idle, this.notIdle]);
      let calc = {
        data: [this.idle, this.notIdle].map((val) => val / scale.divider),
        scale: scale.name,
      };
      resolve(calc);
    });
  }
  _determineValues(user) {
    return new Promise((resolve) => {
      resolve(calc);
    });
  }
  update(data, usersNames) {
    data.then((values) => {
      this.chart.data.datasets[0].data = [];
      this.chart.data.datasets[0].data.push(...values.data);
      let label = "Total time on file in " + values.scale;
      if (usersNames.length != 0) {
        label += " (" + ChartsManager.usersNames + ")";
      } else {
        label += " (all users)";
      }
      this.chart.data.datasets[0].label = label;
      this.chart.update();
    });
  }
  load(ctx, data) {
    data.then((values) => {
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Idle", "Not Idle"],
          datasets: [
            {
              label: "Total time on file in " + values.scale + " (all users)",
              data: [...values.data],
              backgroundColor: [`rgb(235 184 207)`, `rgb(198 191 255)`],
              hoverOffset: 20,
              borderColor: `rgb(229 225 233)`,
            },
          ],
        },
        options: {
          layout: {
            padding: "10",
          },
          plugins: {
            legend: {
              position: `top`,
              labels: {
                color: `rgb(198 191 255)`,
              },
            },
          },
        },
      });
    });
  }
}
class BarChart extends ChartUI {
  constructor(name, manager) {
    super(name, manager);
  }

  calculate(fileData, names) {
    return new Promise((resolve) => {
      let labels = [];
      let userDatasets = [];
      this._calculate(fileData, names).then((value) => {
        labels = value[0];
        userDatasets = value[1];
        resolve({
          calclulatedData: { labels: labels, datasets: userDatasets },
          scale: value[2],
        });
      });
    });
  }
  _calculate(fileData, names) {
    return new Promise((resolve) => {
      let labels = fileData.extConfig.enums.find(
        (x) => x.name == "ActionType"
      ).values;
      let dataSets = [];
      let scale = new Scale(1, "Temp");

      fileData.data.forEach((user) => {
        let data = [];
        let color = DataLoader.users.find(
          (usr) => usr.userName == user.user
        ).color;
        if (names.length != 0) {
          if (names.includes(user.user)) {
            let idleTime = 0;
            const idleIndex = labels.findIndex((l) => l == "Idle");
            let wasIdleAdded = false;
            labels.forEach((lbl) => {
              let d = 0;
              user.dailySessions.forEach((daily) => {
                daily.sessions.forEach((session) => {
                  if (session.actionType == lbl && lbl != "Idle") {
                    d += session.sessionInfo.duration;
                    idleTime +=
                      session.sessionInfo.idle - session.sessionInfo.duration;
                  }
                  if (lbl == "Idle" && session.actionType == "Idle") {
                    idleTime += session.sessionInfo.idle;
                  }
                });
              });
              if (lbl == "Idle") {
                data.push(idleTime);
                wasIdleAdded = true;
                idleTime = 0;
              } else {
                data.push(d);
                if (wasIdleAdded) {
                  data[idleIndex] += idleTime;
                }
              }
            });
            dataSets.push({
              label: user.user,
              data: data,
              backgroundColor: [
                `rgba(${ColorMixer.hexToRgb(color).r},
              ${ColorMixer.hexToRgb(color).g},
              ${ColorMixer.hexToRgb(color).b},0.3)`,
              ],
              borderColor: [color],
              borderWidth: 2,
            });
          }
        } else {
          let idleTime = 0;
          const idleIndex = labels.findIndex((l) => l == "Idle");
          let wasIdleAdded = false;
          labels.forEach((lbl) => {
            let d = 0;
            user.dailySessions.forEach((daily) => {
              daily.sessions.forEach((session) => {
                if (session.actionType == lbl && lbl != "Idle") {
                  d += session.sessionInfo.duration;
                  idleTime +=
                    session.sessionInfo.idle - session.sessionInfo.duration;
                }
                if (lbl == "Idle" && session.actionType == "Idle") {
                  idleTime += session.sessionInfo.idle;
                }
              });
            });
            if (lbl == "Idle") {
              data.push(idleTime);
              wasIdleAdded = true;
              idleTime = 0;
            } else {
              data.push(d);
              if (wasIdleAdded) {
                data[idleIndex] += idleTime;
              }
            }
          });
          dataSets.push({
            label: user.user,
            data: data,
            backgroundColor: [
              `rgba(${ColorMixer.hexToRgb(color).r},
              ${ColorMixer.hexToRgb(color).g},
              ${ColorMixer.hexToRgb(color).b},0.3)`,
            ],
            borderColor: [color],
            borderWidth: 2,
          });
        }
      });
      let tempds = [];
      dataSets.forEach((ds) => {
        tempds.push(...ds.data);
      });
      scale = this.determineScale(tempds);
      dataSets.forEach((d) => {
        d.data = d.data.map((val) => val / scale.divider);
      });
      resolve([labels, dataSets, scale]);
    });
  }
  update(data) {
    data.then((value) => {
      this.chart.data = value.calclulatedData;
      this.chart.options.plugins.legend.title.text =
        "Data presented in " + value.scale.name;
      this.chart.update();
    });
  }
  load(ctx, data) {
    data.then((value) => {
      this.chart = new Chart(ctx, {
        type: "bar",
        data: value.calclulatedData,
        options: {
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: {
              title: {
                display: true,
                text: "Data presented in " + value.scale.name,
              },
            },
          },
        },
      });
    });
  }
}
class LineChart extends ChartUI {
  constructor(name, manager) {
    super(name, manager);
  }

  calculate(fileData, names = []) {
    return new Promise((resolve) => {
      let labels = [];
      let userDatasets = [];
      this._calculateAllTime(fileData, names).then((value) => {
        resolve({
          data: { labels: value[0], datasets: value[1] },
          scale: value[2],
        });
      });
    });
  }
  _getAllTimeLabels(fileData, names) {
    let daysInFile = [];
    let labels = [];
    fileData.data.forEach((user) => {
      if (names.length != 0) {
        if (names.includes(user.user)) {
          user.dailySessions.forEach((date) => {
            daysInFile.push(new Date(Date.parse(date.date)));
          });
        }
      } else {
        user.dailySessions.forEach((date) => {
          daysInFile.push(new Date(Date.parse(date.date)));
        });
      }
    });
    daysInFile = daysInFile.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    for (
      let i = 0;
      i <
      this._calculateDaysDiff(
        daysInFile[0],
        daysInFile[daysInFile.length - 1]
      ) +
        1;
      i++
    ) {
      labels.push(
        new Date(
          daysInFile[0].getTime() + i * 24 * 60 * 60 * 1000
        ).toLocaleDateString()
      );
    }
    return labels;
  }
  _calculateAllTime(fileData, names) {
    let dataSets = [];
    return new Promise((resolve) => {
      let labels = this._getAllTimeLabels(fileData, names);

      const actions = fileData.extConfig.enums.find(
        (x) => x.name == "ActionType"
      ).values;
      let idleData = [];
      const idleIndex = actions.findIndex((l) => l == "Idle");
      let wasIdleAction = false;
      let mixColors = false;
      actions.forEach((action) => {
        let data = [];
        let color;
        fileData.data.forEach((user) => {
          if (names.length != 0) {
            if (names.includes(user.user)) {
              if (names.length == 1) {
                mixColors = true;
                color = DataLoader.users.find(
                  (usr) => usr.userName == user.user
                ).color;
              }
              user.dailySessions.forEach((daily) => {
                let idle = 0;
                let act = 0;
                daily.sessions.forEach((session) => {
                  if (session.actionType == action && action != "Idle") {
                    act += session.sessionInfo.duration;
                    idle +=
                      session.sessionInfo.idle - session.sessionInfo.duration;
                  }
                  if (
                    session.actionType == "Idle" &&
                    session.actionType == action
                  ) {
                    idle += session.sessionInfo.idle;
                  }
                });
                if (action == "Idle") {
                  idleData.push({
                    x: new Date(Date.parse(daily.date)).toDateString(),
                    y: idle,
                  });
                } else {
                  data.push({
                    x: new Date(Date.parse(daily.date)).toDateString(),
                    y: act,
                  });
                  idleData.push({
                    x: new Date(Date.parse(daily.date)).toDateString(),
                    y: idle,
                  });
                }
              });
            }
          } else {
            user.dailySessions.forEach((daily) => {
              let idle = 0;
              let act = 0;
              daily.sessions.forEach((session) => {
                if (session.actionType == action && action != "Idle") {
                  act += session.sessionInfo.duration;
                  idle +=
                    session.sessionInfo.idle - session.sessionInfo.duration;
                }
                if (
                  session.actionType == "Idle" &&
                  session.actionType == action
                ) {
                  idle += session.sessionInfo.idle;
                }
              });
              if (action == "Idle") {
                idleData.push({
                  x: new Date(Date.parse(daily.date)).toDateString(),
                  y: idle,
                });
              } else {
                data.push({
                  x: new Date(Date.parse(daily.date)).toDateString(),
                  y: act,
                });
                idleData.push({
                  x: new Date(Date.parse(daily.date)).toDateString(),
                  y: idle,
                });
              }
            });
          }
        });
        if (action == "Idle") {
          data = this._mergeAndSortData(idleData);
          wasIdleAction = true;
          idleData = [];
        } else {
          data = this._mergeAndSortData(data);
          if (wasIdleAction) {
            idleData = this._mergeAndSortData(idleData);
            idleData.forEach((d) => {
              d.x = new Date(Date.parse(d.x)).toLocaleDateString();
            });
            dataSets[idleIndex].data = this._mergeAndSortData([
              ...dataSets[idleIndex].data,
              ...idleData,
            ]);
          }
        }
        data.forEach((d) => {
          d.x = new Date(Date.parse(d.x)).toLocaleDateString();
        });
        if (mixColors) {
          dataSets.push({
            label: action,
            fill: false,
            data: data,
            backgroundColor: 
              ColorMixer.mixHexColors(color, this._getActionColor(action),0.5),
            
            borderColor: 
              ColorMixer.mixHexColors(color, this._getActionColor(action)),
            
          });
        }else{
          dataSets.push({
            label: action,
            fill: false,
            data: data,
            backgroundColor: [
              `rgba(${ColorMixer.hexToRgb(this._getActionColor(action)).r},
              ${ColorMixer.hexToRgb(this._getActionColor(action)).g},
              ${ColorMixer.hexToRgb(this._getActionColor(action)).b},0.5)`,
            ],
            borderColor: [this._getActionColor(action)],
          });
        }
      });

      let largesScale = new Scale(1, "Temp");
      dataSets.forEach((ds) => {
        let data = ds.data.map((d) => d.y);
        let tempScale = this.determineScale(data);
        if (tempScale.divider > largesScale.divider) {
          largesScale = tempScale;
        }
      });
      dataSets.forEach((ds) => {
        ds.data = ds.data.map((d) => {
          return { x: d.x, y: d.y / largesScale.divider };
        });
      });
      resolve([labels, dataSets, largesScale]);
    });
  }
  _getActionColor(action) {
    switch (action) {
      case "Idle":
        return "#4dc9f6";
      case "Codding":
        return "#f67019";
      case "Debugging":
        return "#f53794";
      case "Documenting":
        return "#acc236";
      case "Testing":
        return "#8549ba";
      case "Building":
        return "#00a950";
    }
  }
  _mergeAndSortData(data = []) {
    const tempMap = new Map();
    data.forEach((value) => {
      if (tempMap.has(value.x)) {
        tempMap.get(value.x).y += value.y;
      } else {
        tempMap.set(value.x, { ...value });
      }
    });
    let merged = Array.from(tempMap.values());
    return merged.sort((a, b) => {
      return Date.parse(a.x) - Date.parse(b.x);
    });
  }
  _calculateDaysDiff(date1, date2) {
    return Math.floor(
      (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  update(data) {
    data.then((value) => {
      this.chart.data = value.data;
      let label = "Data presented in " + value.scale.name;
      if (ChartsManager.usersNames.length != 0) {
        label += " ( " + ChartsManager.usersNames + " )";
      } else {
        label += " (all users)";
      }
      this.chart.options.plugins.legend.title.text = label;
      this.chart.update();
    });
  }
  load(ctx, data) {
    data.then((value) => {
      this.chart = new Chart(ctx, {
        type: "line",
        data: value.data,
        options: {
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: {
              title: {
                display: true,
                text: "Data presented in " + value.scale.name + " (all users)",
              },
            },
          },
        },
      });
    });
  }
}
//unused
class TimelineChart extends ChartUI {
  constructor(manager, name) {
    super(name, manager);
  }
  _mergeAndSortData(data = []) {
    const tempMap = new Map();
    data.forEach((value) => {
      if (tempMap.has(value.x)) {
        tempMap.get(value.x).y += value.y;
      } else {
        tempMap.set(value.x, { ...value });
      }
    });
    let merged = Array.from(tempMap.values());
    return merged.sort((a, b) => {
      return Date.parse(a.x) - Date.parse(b.x);
    });
  }
  calculate(fileData = Core.extSavedData, names) {
    return new Promise((resolve) => {
      let events = [];
      let labels = [];
      let datasets = [];
      fileData.extConfig.enums
        .find((x) => x.name == "ActionType")
        .values.slice(0, 4)
        .forEach((action) => {
          datasets.push({
            label: action,
            data: [],
            stepped: true,
          });
        });
      fileData.data.forEach((user) => {
        user.dailySessions.forEach((daily) => {
          daily.sessions.forEach((session) => {
            session.sessionInfo.durations.forEach((duration) => {
              labels.push(new Date(duration.begin));
              labels.push(new Date(duration.end));
              datasets.forEach((d) => {
                if (d.label == session.actionType) {
                  d.data.push({
                    x: new Date(duration.begin),
                    y: duration.state,
                  });
                  d.data.push({
                    x: new Date(duration.end),
                    y: duration.state,
                  });
                } else {
                  d.data.push({
                    x: new Date(duration.begin),
                    y: null,
                  });
                  d.data.push({
                    x: new Date(duration.end),
                    y: null,
                  });
                }
              });
            });
          });
        });
      });
      datasets = datasets.filter((x) => !x.data.every((d) => d.y == null));
      datasets.forEach((d) => (d.data = this._mergeAndSortData(d.data)));
      labels.sort((a, b) => {
        return a - b;
      });
      labels = labels.map((x) => x.toLocaleString());
      resolve({
        labels: labels,
        datasets: datasets,
      });
    });
  }
  update(data) {}
  load(ctx, data) {
    data.then((value) => {
      this.chart = new Chart(ctx, {
        type: "line",
        data: value,
        options: {
          scales: {
            y: {
              type: "category",
              labels: ["Ongoing", "Idle"],
              offset: true,
            },
          },
          plugins: {
            legend: {
              title: {
                display: true,
                text: "(all users)",
              },
            },
          },
        },
      });
    });
  }
}
class ChartsManager {
  summaryChart = new SummaryChart(this);
  avaliableChartsOptions = [];
  optionsRoot = document.querySelector(".options");
  chartOptionsUI = new ChartsOptionsUI();
  activeChart = new ChartUI();
  static usersNames = [];
  constructor() {
    this.avaliableChartsOptions = [
      {
        name: "Bar Chart",
        icon: "bar_chart",
        chart: new BarChart("Bar Chart", this),
      },
      {
        name: "Line Chart",
        icon: "show_chart",
        chart: new LineChart("Line Chart", this),
      },
      // {
      //   name: "Calendar",
      //   icon: "loyalty",
      //   chart: new TimelineChart("Calendar", this),
      // },
    ];
    this.chartOptionsUI = new ChartsOptionsUI(
      this.avaliableChartsOptions,
      this.optionsRoot
    );
  }
  init() {
    this.chartOptionsUI.createDOMElements(this);
  }
  loadCharts() {
    this.summaryChart.load(
      ctxSummary,
      this.summaryChart.calculate(Core.extSavedData, ChartsManager.usersNames)
    );
    let mainChart = this.getActiveChart();
    this.activeChart = mainChart;
    mainChart.chart.load(
      ctxMain,
      mainChart.chart.calculate(Core.extSavedData, ChartsManager.usersNames)
    );
  }
  getActiveChart() {
    return this.avaliableChartsOptions.find(
      (chart) => chart.name == this.chartOptionsUI.getActive()
    );
  }
  updateCharts() {
    this.summaryChart.update(
      this.summaryChart.calculate(Core.extSavedData, ChartsManager.usersNames),
      ChartsManager.usersNames
    );
    let mainChart = this.getActiveChart();
    this.activeChart = mainChart;
    mainChart.chart.update(
      mainChart.chart.calculate(Core.extSavedData, ChartsManager.usersNames),
      ChartsManager.usersNames
    );
  }
  reactOnStateChange() {
    this.activeChart.chart.chart.destroy();
    this.activeChart = this.getActiveChart();
    ctxMain.classList.remove("hide");
    this.activeChart.chart.load(
      ctxMain,
      this.activeChart.chart.calculate(
        Core.extSavedData,
        ChartsManager.usersNames
      )
    );
  }
}
class UserUI {
  root = document.querySelector(".usersArea");
  userElement = document.createElement("div");
  userName = "";
  color = "#AAA";
  constructor() {
    this.initSearch();
  }
  createUserElement(name, color = this.getRandomColor()) {
    this.userName = name;
    this.color = color;
    let spanElement = document.createElement("span");
    let inputElement = document.createElement("input");

    spanElement.textContent = name;
    inputElement.type = "color";
    inputElement.value = color;
    inputElement.classList.add("userInput");

    this.userElement.appendChild(spanElement);
    this.userElement.appendChild(inputElement);
    this.userElement.classList.add("user");
    this.userElement.addEventListener("change", (ev) => {
      this.color = ev.target.value;
      Core.ChartsManager.updateCharts();
    });
    this.userElement.addEventListener("click", (ev) => {
      if (!ev.target.classList.contains("userInput")) {
        if (this.userElement.classList.contains("checked")) {
          this.userElement.classList.remove("checked");
          ChartsManager.usersNames = ChartsManager.usersNames.filter(
            (el) => el != this.userName
          );
        } else {
          this.userElement.classList.add("checked");
          ChartsManager.usersNames.push(this.userName);
        }
        Core.ChartsManager.updateCharts();
      }
    });
    this.root.appendChild(this.userElement);
    return this;
  }
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  initSearch() {
    let searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("keyup", (ev) => {
      var users = document.querySelectorAll(".user");
      if (ev.target.value == "") {
        users.forEach((user) => {
          if (user.classList.contains("hide")) {
            user.classList.remove("hide");
          }
        });
      }
      users.forEach((user) => {
        if (
          !user.textContent
            .toLowerCase()
            .includes(ev.target.value.toLowerCase())
        ) {
          user.classList.add("hide");
        } else {
          user.classList.contains("hide") ? user.classList.remove("hide") : "";
        }
      });
    });
  }
}
class FeedUI {
  rootElement = document.querySelector(".feed");

  createTextElement(
    title,
    date,
    content,
    linkText,
    linkAddress,
    isFirst = false
  ) {
    let domElement = document.createElement("div");
    domElement.classList.add("feed-element");
    let feedInfoElement = document.createElement("div");
    feedInfoElement.classList.add("feed-info");
    let feedContentElement = document.createElement("div");
    feedContentElement.classList.add("feed-content");
    let linkElement = document.createElement("a");

    let titleElement = isFirst
      ? document.createElement("h3")
      : document.createElement("h4");
    let timeElement = document.createElement("h5");
    let contentElement = document.createElement("span");

    titleElement.innerHTML = title;
    timeElement.innerHTML = date;
    contentElement.innerHTML = content;
    linkElement.href = linkAddress;
    linkElement.text = linkText;

    feedInfoElement.appendChild(titleElement);
    feedInfoElement.appendChild(timeElement);
    feedContentElement.appendChild(contentElement);
    feedContentElement.appendChild(linkElement);
    domElement.appendChild(feedInfoElement);
    domElement.appendChild(feedContentElement);
    this.rootElement.appendChild(domElement);
  }
}
class ChartOptionUI {
  manager;
  name = "";
  icon = "";
  container = "";
  active = false;
  domElement = document.createElement("div");

  constructor(name, icon, contaner, root) {
    this.icon = icon;
    this.name = name;
    this.container = contaner;

    let iElement = document.createElement("i");
    let spanElement = document.createElement("span");

    iElement.classList.add("material-symbols-outlined");
    iElement.textContent = this.icon;
    spanElement.textContent = this.name;
    this.domElement.classList.add("chartOption");
    this.domElement.appendChild(iElement);
    this.domElement.appendChild(spanElement);

    this.domElement.addEventListener("click", () => this.changeState());
    root.appendChild(this.domElement);
  }
  changeState() {
    this.container.resetOthersState();
    if (this.domElement.classList.contains("checked")) {
      this.domElement.classList.remove("checked");
      this.active = false;
    } else {
      this.domElement.classList.add("checked");
      this.active = true;
    }
    this.manager.reactOnStateChange();
  }
}
class ChartsOptionsUI {
  root;
  children = [];
  options = [];

  constructor(options, root) {
    this.root = root;
    this.options = options;
  }
  createDOMElements(manager) {
    this.options.forEach((opt) => {
      let child = new ChartOptionUI(opt.name, opt.icon, this, this.root);
      child.manager = manager;
      this.children.push(child);
    });
    this.children[0].domElement.classList.add("checked");
    this.children[0].active = true;
  }
  getActive() {
    return this.children.find((child) => child.active).name;
  }
  resetOthersState() {
    this.children.forEach((child) => {
      if (child.active) {
        child.domElement.classList.remove("checked");
        child.active = false;
      }
    });
  }
}
class DataLoader {
  static users = [];
  constructor() {}

  loadFeeds() {
    return fetch("content\\feed.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let counter = 0;
        let isFirst = true;
        json.feeds.forEach((element) => {
          if (counter <= 3) {
            counter++;
            let x = new FeedUI();
            x.createTextElement(
              element.title,
              element.date,
              element.content.content,
              element.content.link.text,
              element.content.link.link,
              isFirst
            );
            isFirst = false;
          } else {
            return;
          }
        });
      });
  }
  loadUsers() {
    let root = document.querySelector(".container");
    if (Core.extSavedData.data.length > 1) {
      root.classList.remove("oneUserContainer");
      root.classList.add("multiUserContainer");
      Core.extSavedData.data.forEach((x) => {
        DataLoader.users.push(new UserUI().createUserElement(x.user));
      });
    } else if (Core.extSavedData.data.length == 1) {
      DataLoader.users.push(
        new UserUI().createUserElement(Core.extSavedData.data[0].user)
      );
      root.classList.remove("multiUserContainer");
      document.querySelector(".users").classList.add("hide");
      root.classList.add("oneUserContainer");
    }
  }
}
class FileLoader {
  modal = document.querySelector(".fileInput");
  dropArea = document.querySelector("#fileDropArea");

  constructor() {
    this.dropArea.addEventListener("dragover", (ev) => {
      ev.preventDefault();
    });
    this.dropArea.addEventListener("drop", (ev) => {
      ev.preventDefault();
      let file = ev.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        let promise = new Promise((resolve) => {
          let value = JSON.parse(fileReader.result);
          resolve(value);
        });
        promise.then((value) => {
          Core.extSavedData = value;
          Core.DataLoader.loadUsers();
          Core.ChartsManager.loadCharts();
          this.modal.classList.add("hide");
        });
      };
      fileReader.readAsText(file);
    });
  }
}
class ColorMixer {
  static hexToRgb(hex) {
    hex = hex.replace("#",'');
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  static rgbToHex(color) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
  }

  static mixColors(color1, color2) {
    console.log("user",color1);
    console.log("pallete",color2);
    return {
      r: (color1.r + color2.r) / 2,
      g: (color1.g + color2.g) / 2,
      b: (color1.b + color2.b) / 2,
    };
  }

  static mixHexColors(color1Hex, color2Hex, opacity = 1) {
    const color = ColorMixer.mixColors(
      ColorMixer.hexToRgb(color1Hex),
      ColorMixer.hexToRgb(color2Hex),
    );
    return `rgba(${color.r},${color.g},${color.b},${opacity})`
  }
}
class Core {
  static version = "1.0.0.0";
  static extSavedData = {
    extConfig: {
      enums: [
        {
          name: "ActionType",
          values: [
            "Building",
            "Codding",
            "Debugging",
            "Documenting",
            "Idle",
            "Testing",
          ],
        },
        {
          name: "SessionState",
          values: ["Ongoing", "Idle", "Ended"],
        },
      ],
    },
    data: [
      {
        config: {
          showIdle: true,
        },
        user: "JohnDoe",
        dailySessions: [
          {
            date: "10/29/2024",
            sessions: [
              {
                sessionInfo: {
                  id: "a68a25cc-1da5-4209-ae81-54ee187dee0b",
                  duration: 1500,
                  idle: 750,
                  state: "Ongoing",
                  durations: [
                    {
                      id: "eb3ccf16-f7f4-4041-be18-616402a61756",
                      state: "Ongoing",
                      begin: 1731864643966,
                      end: 1731864648929,
                      duration: 4963,
                    },
                  ],
                },
                actionType: "Documenting",
              },
              {
                sessionInfo: {
                  id: "a68a25cc-1da5-4209-ae81-54ee187dee0b",
                  duration: 1200,
                  idle: 750,
                  state: "Ongoing",
                  durations: [],
                },
                actionType: "Building",
              },
              {
                sessionInfo: {
                  id: "a68a25cc-1da5-4209-ae81-54ee187dee0b",
                  duration: 1000,
                  idle: 750,
                  state: "Ongoing",
                  durations: [],
                },
                actionType: "Debugging",
              },
              {
                sessionInfo: {
                  id: "a68a25cc-1da5-4209-ae81-54ee187dee0b",
                  duration: 4000,
                  idle: 750,
                  state: "Ongoing",
                  durations: [],
                },
                actionType: "Codding",
              },
              {
                sessionInfo: {
                  id: "a68a25cc-1da5-4209-ae81-54ee187dee0b",
                  duration: 2000,
                  idle: 1750,
                  state: "Ongoing",
                  durations: [],
                },
                actionType: "Testing",
              },
            ],
          },
        ],
      },
    ],
  };
  static FileLoader = new FileLoader();
  static ChartsManager = new ChartsManager();
  static DataLoader = new DataLoader();
  constructor() {}

  init() {
    Chart.defaults.font.family = "Scope One";
    Chart.defaults.color = "rgb(229,225,233)";
    Chart.defaults.borderColor = "rgba(229,225,233,0.1)";
    Core.ChartsManager.init();
    Core.DataLoader.loadFeeds();
  }
  symulate() {
    this.loadDummyData().then(
      (value) => {
        if (value) {
          console.log(`Succesfully retrive data!`);
          Core.DataLoader.loadUsers();
          Core.ChartsManager.loadCharts();
        }
      },
      (ms) => {
        console.log(`Error occures: ${ms}`);
        Core.DataLoader.loadUsers();
        Core.ChartsManager.loadCharts();
      }
    );
  }
  loadDummyData() {
    return new Promise((resolve, reject) => {
      const host = "http://localhost:3000";
      const routes = ["extConfig", "data"];
      fetch(`${host}/${routes[0]}`, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          Core.extSavedData.extConfig = json;
          return fetch(`${host}/${routes[1]}`);
        })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          Core.extSavedData.data = json;
          resolve(true);
        })
        .catch((err) => {
          reject("JSON Server is not running!");
        });
    });
  }
}

const core = new Core();
core.init();
// core.symulate();

//todo: loading files again 
//todo: loading files from localhost

