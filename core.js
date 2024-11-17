const ctxSummary = document.querySelector("#summaryCanvas");
const ctxMain = document.querySelector("#mainCanvas");
const calendar = document.querySelector(".calendar");

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
  calculate(dataFromFile, usersNames = []) {
    return new Promise((resolve) => {
      this.idle = 0;
      this.notIdle = 0;

      dataFromFile.data.forEach((user) => {
        if (usersNames.length != 0) {
          if (usersNames.includes(user.user)) {
            this._determineValues(user).then((values) => {
              resolve(values);
            });
          }
        } else {
          this._determineValues(user).then((values) => {
            resolve(values);
          });
        }
      });
    });
  }
  _determineValues(user) {
    return new Promise((resolve) => {
      user.dailySessions.forEach((daily) => {
        daily.sessions.forEach((session) => {
          this.notIdle += session.sessionInfo.duration;
          this.idle += session.sessionInfo.idle;
        });
      });
      resolve([this.idle, this.notIdle]);
    });
  }
  update(data, usersNames = []) {
    data.then((values)=>{
      this.chart.data.datasets[0].data = [];
      this.chart.data.datasets[0].data.push(...values);
      let label = "Total time on file in minutes";
      if (usersNames.length != 0) {
        label += " (";
        let i = 0;
        usersNames.forEach((name) => {
          if (i > 0 && i < usersNames.length) {
            label += ",";
          }
          label += name;
          i++;
        });
        label += ")";
      }
      this.chart.data.datasets[0].label = label;
      this.chart.update();
    });
  }
  load(ctx, data) {
    data.then((values)=>{
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Idle", "Not Idle"],
          datasets: [
            {
              label: "Total time on file in minutes",
              data: [...values],
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
  constructor(name, manager){
    super(name, manager);
  }

  calculate(fileData = globalData, names = []) {
    return new Promise((resolve=>{
      let labels = [];
      let userDatasets = [];
      this._calculate(fileData, names).then((value) => {
        labels = value[0];
        userDatasets = value[1];
        resolve({ labels: labels, datasets: userDatasets });
      });
    }));
  }
  _calculate(fileData, names) {
    return new Promise((resolve) => {
      let labels = fileData.extConfig.enums.find(
        (x) => x.name == "ActionType"
      ).values;
      let dataSets = [];
      
      fileData.data.forEach((user) => {
        let data = [];
        let color = DataLoader.users.find((usr) => usr.userName == user.user).color;
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
              });
              data.push(d);
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
class PieChart extends ChartUI {
  constructor(name, manager) {
    super(name, manager);
  }

  calculate(fileData = globalData, names = []) {
    return new Promise((resolve) => {
      let labels = [];
      let userDatasets = [];
      this._calculate(fileData, names).then((value) => {
        labels = value[0];
        userDatasets = value[1];
        resolve({ labels: labels, datasets: userDatasets });
      });
    });
  }
  _calculate(fileData, names) {
    return new Promise((resolve) => {
      let labels = fileData.extConfig.enums.find(
        (x) => x.name == "ActionType"
      ).values;
      let dataSets = [];

      fileData.data.forEach((user) => {
        let data = [];
        let color = DataLoader.users.find(
          (usr) => usr.userName == user.user
        ).color;
        if (names.length != 0) {
          if (names.includes(user.user)) {
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
              });
              data.push(d);
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
    data.then((value) => {
      this.chart.data = value;
      this.chart.update();
    });
  }
  load(ctx, data) {
    data.then((value) => {
      this.chart = new Chart(ctx, {
        type: "pie",
        data: value,
        options: {
          scales: {
            y: { beginAtZero: true },
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
  constructor(){
    this.avaliableChartsOptions = [
      {
        name: "Bar Chart",
        icon: "bar_chart",
        chart: new BarChart("Bar Chart", this),
      },
      {
        name: "Pie Chart",
        icon: "pie_chart",
        chart: new PieChart("Pie Chart",this),
      },
      {
        name: "Lov Dziobuś",
        icon: "loyalty",
      },
    ];
    this.chartOptionsUI = new ChartsOptionsUI(this.avaliableChartsOptions, this.optionsRoot);
  }
  init(){
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
  getActiveChart(){
    return this.avaliableChartsOptions.find(
      (chart) => chart.name == this.chartOptionsUI.getActive()
    );
  }
  updateCharts() {
    
  }
  reactOnStateChange(){
    this.activeChart.chart.chart.destroy();
    this.activeChart = this.getActiveChart();
    this.activeChart.chart.load(
      ctxMain,
      this.activeChart.chart.calculate(Core.extSavedData, ChartsManager.usersNames)
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
      ChartsManager.updateCharts();
    })
    this.userElement.addEventListener("click", (ev) => {
      if(ev.target.classList.contains("user")){
        if (this.userElement.classList.contains("checked")) {
          this.userElement.classList.remove("checked");
          ChartsManager.usersNames.pop(this.userName);
          loader.users.pop(this);
        } else {
          ChartsManager.usersNames.push(this.userName);
          loader.users.push(this);
          this.userElement.classList.add("checked");
        }
        ChartsManager.updateCharts();
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
  createDOMElements(manager){
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
  constructor() {
  }

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
        ChartsManager.usersNames.push(x.user);
      });
    } else if (Core.extSavedData.data.length == 1) {
      ChartsManager.usersNames.push(Core.extSavedData.data[0].user);
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
        let promise = new Promise((resolve)=>{
          let value = JSON.parse(fileReader.result); 
          resolve(value);
        })
        promise.then((value)=>{
          Core.extSavedData = value;
          Core.DataLoader.loadUsers();
          Core.ChartsManager.loadCharts();
          this.modal.classList.add("hide");
        })
      };
      fileReader.readAsText(file);
    });
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
                  durations: [],
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
    Core.ChartsManager.init();
    Core.DataLoader.loadFeeds();
  }
}


const core = new Core();
core.init();





