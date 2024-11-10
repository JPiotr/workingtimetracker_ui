let sampleData = {
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
            }
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
            }
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

class ChartLoader {
  summaryChart = "";
  names = [];
  constructor() {}

  calculateSummaryChartData(dataFromFile = sampleData) {
    let idle = 0;
    let notIdle = 0;

    dataFromFile.data.forEach((user) => {
      if (this.names.length != 0) {
        if (this.names.includes(user.user)) {
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

  updateSummaryChart(data) {
    this.summaryChart.data.datasets[0].data = [];
    this.summaryChart.data.datasets[0].data.push(...data);
    let label = "Total time on file in minutes";
    if(this.names.length != 0){
      label += " (";
      let i = 0;
      this.names.forEach((name)=>{
        if(i > 0 && i < this.names.length){
          label += ","
        }
        label += name
        i++;
      })
      label += ")";
    }
    this.summaryChart.data.datasets[0].label = label;
    this.summaryChart.update();
  }

  loadSummaryChart(ctx, data) {
    this.summaryChart = new Chart(ctx, {
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
class UserUI {
  root = document.querySelector(".usersArea");
  userElement = document.createElement("div");
  userName = "";
  constructor() {
    this.initSearch();
  }
  createUserElement(name, color = this.getRandomColor()) {
    this.userName = name;
    let spanElement = document.createElement("span");
    let inputElement = document.createElement("input");

    spanElement.textContent = name;
    inputElement.type = "color";
    inputElement.value = color;

    this.userElement.appendChild(spanElement);
    this.userElement.appendChild(inputElement);
    this.userElement.classList.add("user");
    this.userElement.addEventListener("click", (ev) => {
      if (this.userElement.classList.contains("checked")) {
        this.userElement.classList.remove("checked");
        loader.charsLoader.names.pop(this.userName);
      } else {
        loader.charsLoader.names.push(this.userName);
        this.userElement.classList.add("checked");
      }
      loader.charsLoader.updateSummaryChart(
        loader.charsLoader.calculateSummaryChartData()
      );
    });
    this.root.appendChild(this.userElement);
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
  loadSummaryData() {
    this.charsLoader.loadSummaryChart(
      ctxSummary,
      this.charsLoader.calculateSummaryChartData(sampleData)
    );
  }
  loadUsers() {
    let root = document.querySelector(".container");
    if (sampleData.data.length > 1) {
      root.classList.remove("oneUserContainer");
      root.classList.add("multiUserContainer");
      sampleData.data.forEach((x) => {
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
      console.log(ev);
    });
    dropArea.addEventListener("drop", (ev) => {
      ev.preventDefault();
      let file = ev.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        sampleData = JSON.parse(fileReader.result);
        const loader = new DataLoader();
        loader.loadSummaryData();
        loader.loadUsers();
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
loader.loadSummaryData();
