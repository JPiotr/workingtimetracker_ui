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
                duration: 9677,
                idle: 472796,
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
                duration: 49,
                idle: 16748,
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

function SummaryChart(dataFromFile) {
  let labels = [];
  let idle = 0;
  let notIdle = 0;
  dataFromFile.data[0].dailySessions.forEach((x) => labels.push(x.date));
  labels.forEach((x) => {
    let dateInfo = dataFromFile.data[0].dailySessions.find((y) => y.date == x);

    dateInfo.sessions.forEach((z) => {
      idle += z.sessionInfo.idle;
      notIdle += z.sessionInfo.duration;
    });
  });

  new Chart(ctxSummary, {
    type: "pie",
    data: {
      labels: ["Idle", "Not Idle"],
      datasets: [
        {
          label: "Total time on file in minutes",
          data: [idle / 60 / 1000, notIdle / 60 / 1000],
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

// SummaryChart();

function loadData() {
  //todo
}
// function loadUsers(){
//   sampleData.data.forEach((x)=>{
//     let domElement = document.createElement("div");
//     let span = document.createElement("span");
//     let input = document.createElement("input");

//     span.innerHTML = x.user;
//     input.type = "color";
//     input.value = "#AA00FF";
//     domElement.appendChild(span);
//     domElement.appendChild(input);

//     domElement.classList.add("user");
//     usersContainer.appendChild(domElement);
//   });
// }
class FeedUI {
  rootElement = document.querySelector(".feed");

  FeedUI() {}

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
  DataLoader() {}

  loadFeeds() {
    return fetch("content\\feed.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
        let counter = 0;
        let isFirst = true;
        json.feeds.forEach((element) => {
          if(counter <= 3){
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
          }
          else{return;}
        });
      })
  }
  loadSummaryData(){
    SummaryChart(sampleData)
  }
}

function initialize() {
  // loadUsers()
}
initialize();
const loader = new DataLoader();
loader.loadFeeds();
loader.loadSummaryData();

