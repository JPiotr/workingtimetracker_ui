let globalData = {
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
      user: "JPiotr",
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
                    id: "7c62e469-87e8-4ae9-9707-86574878f529",
                    state: "Ongoing",
                    begin: 1730205785278,
                    end: 1730205785278,
                    duration: 0,
                  },
                  {
                    id: "aa8dee0e-63dd-4d4e-8fcc-ba9254a62be6",
                    state: "Idle",
                    begin: 1730205322159,
                    end: 1730205785278,
                    duration: 463119,
                  },
                  {
                    id: "f49b7bac-09d4-4d5c-9238-a10f28bfd805",
                    state: "Ongoing",
                    begin: 1730205313734,
                    end: 1730205322159,
                    duration: 8425,
                  },
                ],
              },
              actionType: "Documenting",
            },
            {
              sessionInfo: {
                id: "94223a84-45c9-49ca-a012-3333ff735f15",
                duration: 500,
                idle: 250,
                state: "Ended",
                durations: [
                  {
                    id: "36ec6001-84de-4328-a5a7-6e14d068bf58",
                    state: "Ongoing",
                    begin: 1730205803278,
                    end: 1730205806578,
                    duration: 3300,
                  },
                  {
                    id: "6c2f94ea-82b8-4cfb-831d-deaea2a82420",
                    state: "Idle",
                    begin: 1730205786579,
                    end: 1730205803278,
                    duration: 16699,
                  },
                  {
                    id: "aa5c4657-c652-4e7f-a427-9fb1bba9a701",
                    state: "Ongoing",
                    begin: 1730205786530,
                    end: 1730205786579,
                    duration: 49,
                  },
                ],
              },
              actionType: "Codding",
            },
          ],
        },
      ],
    },
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
                duration: 1000,
                idle: 300,
                state: "Ongoing",
                durations: [
                  {
                    id: "7c62e469-87e8-4ae9-9707-86574878f529",
                    state: "Ongoing",
                    begin: 1730205785278,
                    end: 1730205785278,
                    duration: 0,
                  },
                  {
                    id: "aa8dee0e-63dd-4d4e-8fcc-ba9254a62be6",
                    state: "Idle",
                    begin: 1730205322159,
                    end: 1730205785278,
                    duration: 463119,
                  },
                  {
                    id: "f49b7bac-09d4-4d5c-9238-a10f28bfd805",
                    state: "Ongoing",
                    begin: 1730205313734,
                    end: 1730205322159,
                    duration: 8425,
                  },
                ],
              },
              actionType: "Documenting",
            },
            {
              sessionInfo: {
                id: "94223a84-45c9-49ca-a012-3333ff735f15",
                duration: 300,
                idle: 1000,
                state: "Ended",
                durations: [
                  {
                    id: "36ec6001-84de-4328-a5a7-6e14d068bf58",
                    state: "Ongoing",
                    begin: 1730205803278,
                    end: 1730205806578,
                    duration: 3300,
                  },
                  {
                    id: "6c2f94ea-82b8-4cfb-831d-deaea2a82420",
                    state: "Idle",
                    begin: 1730205786579,
                    end: 1730205803278,
                    duration: 16699,
                  },
                  {
                    id: "aa5c4657-c652-4e7f-a427-9fb1bba9a701",
                    state: "Ongoing",
                    begin: 1730205786530,
                    end: 1730205786579,
                    duration: 49,
                  },
                ],
              },
              actionType: "Codding",
            },
          ],
        },
      ],
    },
    {
      config: {
        showIdle: true,
      },
      user: "BillyBones",
      dailySessions: [
        {
          date: "10/29/2024",
          sessions: [
            {
              sessionInfo: {
                id: "a68a25cc-1da5-4209-ae81-54ee187dee0b",
                duration: 100,
                idle: 10,
                state: "Ongoing",
                durations: [
                  {
                    id: "7c62e469-87e8-4ae9-9707-86574878f529",
                    state: "Ongoing",
                    begin: 1730205785278,
                    end: 1730205785278,
                    duration: 0,
                  },
                  {
                    id: "aa8dee0e-63dd-4d4e-8fcc-ba9254a62be6",
                    state: "Idle",
                    begin: 1730205322159,
                    end: 1730205785278,
                    duration: 463119,
                  },
                  {
                    id: "f49b7bac-09d4-4d5c-9238-a10f28bfd805",
                    state: "Ongoing",
                    begin: 1730205313734,
                    end: 1730205322159,
                    duration: 8425,
                  },
                ],
              },
              actionType: "Documenting",
            },
            {
              sessionInfo: {
                id: "94223a84-45c9-49ca-a012-3333ff735f15",
                duration: 50,
                idle: 1000,
                state: "Ended",
                durations: [
                  {
                    id: "36ec6001-84de-4328-a5a7-6e14d068bf58",
                    state: "Ongoing",
                    begin: 1730205803278,
                    end: 1730205806578,
                    duration: 3300,
                  },
                  {
                    id: "6c2f94ea-82b8-4cfb-831d-deaea2a82420",
                    state: "Idle",
                    begin: 1730205786579,
                    end: 1730205803278,
                    duration: 16699,
                  },
                  {
                    id: "aa5c4657-c652-4e7f-a427-9fb1bba9a701",
                    state: "Ongoing",
                    begin: 1730205786530,
                    end: 1730205786579,
                    duration: 49,
                  },
                ],
              },
              actionType: "Codding",
            },
            {
              sessionInfo: {
                id: "9f2c72c5-1e43-43c2-b0d8-9d0a196a832c",
                duration: 0,
                idle: 0,
                state: "Ended",
                durations: [
                  {
                    id: "73b7bbd5-0e7d-4bc6-a5fc-3a5f2fb4289a",
                    state: "Ongoing",
                    begin: 1730209419726,
                    end: 1730209419727,
                    duration: 1,
                  },
                ],
              },
              actionType: "Codding",
            },
            {
              sessionInfo: {
                id: "bba50bec-4252-4966-a93f-0063445b2ee1",
                duration: 0,
                idle: 0,
                state: "Idle",
                durations: [],
              },
              actionType: "Stop",
            },
          ],
        },
      ],
    },
  ],
};
const usersContainer = document.querySelector(".users");

const ctxSummary = document.querySelector("#summaryCanvas");
const ctxMain = document.querySelector("#mainCanvas");
//todo refactor this!
class ChartUI {
  name = "Base";
  chart = new Chart();
  calculate() {
    console.error("Method not implemented!");
  }
  update() {
    console.error("Method not implemented!");
  }
  load() {
    console.error("Method not implemented!");
  }
}
class SummaryChart extends ChartUI {
  name = "Summary Chart";
  calculate(dataFromFile, names = []) {
    let idle = 0;
    let notIdle = 0;

    dataFromFile.data.forEach((user) => {
      if (names.length != 0) {
        if (names.includes(user.user)) {
          user.dailySessions.forEach((daily) => {
            daily.sessions.forEach((session) => {
              notIdle += session.sessionInfo.duration;
              idle += session.sessionInfo.idle;
            });
          });
        }
      } else {
        user.dailySessions.forEach((daily) => {
          daily.sessions.forEach((session) => {
            notIdle += session.sessionInfo.duration;
            idle += session.sessionInfo.idle;
          });
        });
      }
    });
    return [idle, notIdle];
  }
  update(data, names = []) {
    this.chart.data.datasets[0].data = [];
    this.chart.data.datasets[0].data.push(...data);
    let label = "Total time on file in minutes";
    if (names.length != 0) {
      label += " (";
      let i = 0;
      names.forEach((name) => {
        if (i > 0 && i < names.length) {
          label += ",";
        }
        label += name;
        i++;
      });
      label += ")";
    }
    this.chart.data.datasets[0].label = label;
    this.chart.update();
  }
  load(ctx, data) {
    this.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Idle", "Not Idle"],
        datasets: [
          {
            label: "Total time on file in minutes",
            data: [...data],
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
  }
}
class BarChart extends ChartUI {
  name = ChartsOptionsUI.options[0].name;

  calculate(fileData = globalData, names = [], idle = false) {
    return new Promise((resolve=>{
      let labels = [];
      let userDatasets = [];
      this._calculate(fileData, names, idle).then((value) => {
        labels = value[0];
        userDatasets = value[1];
        resolve({ labels: labels, datasets: userDatasets });
      });
    }));
  }
  _calculate(fileData, names, idle) {
    return new Promise((resolve) => {
      let labels = fileData.extConfig.enums.find(
        (x) => x.name == "ActionType"
      ).values;
      let dataSets = [];
      
      fileData.data.forEach((user) => {
        let data = [];
        let color = loader.users.find((usr) => usr.userName == user.user).color;
        if (names.length != 0) {
          if(names.includes(user.user)){
            labels.forEach((lbl) => {
              let d = 0;
              user.dailySessions.forEach((daily) => {
                daily.sessions.forEach((session) => {
                  if (session.actionType == lbl && lbl != "Idle") {
                    d += session.sessionInfo.duration;
                  }
                  if (lbl == "Idle") {
                    d += session.sessionInfo.idle;
                  }
                });
                data.push(d);
              });
            });
            dataSets.push({
              label: user.user,
              data: data,
              backgroundColor: [color],
              borderColor: [color],
              borderWidth: 1,
            });
          }
        } else {
          labels.forEach((lbl) => {
            let d = 0;
            user.dailySessions.forEach((daily) => {
              daily.sessions.forEach((session) => {
                if (session.actionType == lbl && lbl != "Idle") {
                  d += session.sessionInfo.duration;
                }
                if (lbl == "Idle") {
                  d += session.sessionInfo.idle;
                }
              });
              data.push(d);
            });
          });
          dataSets.push({
            label: user.user,
            data: data,
            backgroundColor: [color],
            borderColor: [color],
            borderWidth: 1,
          });
        }


        
      });
      resolve([labels, dataSets]);
    });
  }

  update(data) {
    data.then((value)=>{
      this.chart.data = value;
      this.chart.update();
    })
  }

  load(ctx, data) {
    data.then((value)=>{
      this.chart = new Chart(ctx, {
        type: "bar",
        data: value,
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    })
  }
}

class ChartLoader {
  data = globalData;
  summaryChart = new SummaryChart();
  names = [];

  charts = [new BarChart()];
  currentChartName = this.charts[0].name;
  currentMainChart = this.charts[0];
  constructor(data = globalData) {
    this.data = data;
  }
  setMainChart(name) {
    this.currentMainChart = this.charts.find(
      (x) => x.name == this.currentChartName
    );
  }
  updateCharts() {
    this.summaryChart.update(
      this.summaryChart.calculate(this.data, this.names),
      this.names
    );
    this.currentMainChart.update(
      this.currentMainChart.calculate(this.data, this.names, false)
    );
  }
  loadCharts(ctxSummary, ctxMain) {
    this.summaryChart.load(ctxSummary, this.summaryChart.calculate(this.data));
    this.currentMainChart.load(
      ctxMain,
      this.currentMainChart.calculate(this.data, [], false)
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

    this.userElement.appendChild(spanElement);
    this.userElement.appendChild(inputElement);
    this.userElement.classList.add("user");
    this.userElement.addEventListener("change",(ev)=>{
      this.color = ev.target.value;
      loader.charsLoader.updateCharts();
    })
    this.userElement.addEventListener("click", (ev) => {
      if(ev.target.classList.contains("user")){
        if (this.userElement.classList.contains("checked")) {
          this.userElement.classList.remove("checked");
          loader.charsLoader.names.pop(this.userName);
          loader.users.pop(this);
        } else {
          loader.charsLoader.names.push(this.userName);
          loader.users.push(this);
          this.userElement.classList.add("checked");
        }
        loader.charsLoader.updateCharts();
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
  name = "";
  value = "";
  container = "";
  active = false;
  domElement = document.createElement("div");

  constructor(name, value, contaner, root) {
    this.name = name;
    this.value = value;
    this.container = contaner;

    let iElement = document.createElement("i");
    let spanElement = document.createElement("span");

    iElement.classList.add("material-symbols-outlined");
    iElement.textContent = value;
    spanElement.textContent = name;
    this.domElement.classList.add("chartOption");
    this.domElement.appendChild(iElement);
    this.domElement.appendChild(spanElement);

    this.domElement.addEventListener("click", (ev) => this.changeState());
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
  }
}
class ChartsOptionsUI {
  root = document.querySelector(".options");
  children = [];
  static options = [
    {
      name: "Bar Chart",
      value: "bar_chart",
    },
    {
      name: "Pie Chart",
      value: "pie_chart",
    },
    {
      name: "Lov Dziobuś",
      value: "loyalty",
    },
  ];

  constructor() {
    ChartsOptionsUI.options.forEach((opt) => {
      let child = new ChartOptionUI(opt.name, opt.value, this, this.root);
      this.children.push(child);
    });
    this.children[0].changeState();
  }
  getActive() {
    return this.children.find((child) => child.active);
  }
  resetOthersState() {
    this.children.forEach((child) => {
      if (child.active) {
        child.domElement.classList.remove("checked");
      }
    });
  }
}
class DataLoader {
  charsLoader = new ChartLoader();
  users = [];
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
  loadCharts() {
    this.charsLoader.loadCharts(ctxSummary, ctxMain);
  }
  loadUsers() {
    let root = document.querySelector(".container");
    if (globalData.data.length > 1) {
      root.classList.remove("oneUserContainer");
      root.classList.add("multiUserContainer");
      globalData.data.forEach((x) => {
        this.users.push(new UserUI().createUserElement(x.user));
      });
    } else {
      root.classList.remove("multiUserContainer");
      document.querySelector(".users").classList.add("hide");
      root.classList.add("oneUserContainer");
    }
  }
}
class FileLoader {
  constructor() {
    const modal = document.querySelector(".fileInput");
    let dropArea = document.querySelector("#fileDropArea");
    dropArea.addEventListener("dragover", (ev) => {
      ev.preventDefault();
    });
    dropArea.addEventListener("drop", (ev) => {
      ev.preventDefault();
      let file = ev.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        globalData = JSON.parse(fileReader.result);
        const loader = new DataLoader();
        loader.loadUsers();
        loader.loadCharts();
        modal.classList.add("hide");
      };
      fileReader.readAsText(file);
    });
  }
}

function initialize() {}
initialize();
const file = new FileLoader();
const loader = new DataLoader();
loader.loadFeeds();
loader.loadUsers();
loader.loadCharts();
const options = new ChartsOptionsUI();
