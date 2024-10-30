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

const ctx = document.querySelector("#summaryCanvas");

function SummaryChart(){    
    let labels = [];
    // let data = [
    //   {
    //     label: "Idle (min)",
    //     data: [],
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Not idle (min)",
    //     data: [],
    //     borderWidth: 1,
    //   },
    // ];
    let idle = 0;
    let notIdle = 0;
    sampleData.data[0].dailySessions.forEach((x)=> labels.push(x.date));
    labels.forEach((x)=>{
      let dateInfo = sampleData.data[0].dailySessions.find((y)=>y.date == x);

      dateInfo.sessions.forEach((z)=>{
        idle += z.sessionInfo.idle;
        notIdle += z.sessionInfo.duration;
      });
      // data[0].data.push(idle/60/1000);
      // data[1].data.push(notIdle/60/1000);
    })
    

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Idle", "Not Idle"],
        datasets: [
          {
            label: "Sum in file",
            data: [idle / 60 / 1000, notIdle / 60 / 1000],
            backgroundColor: [`rgb(255 186 177)`, `rgb(254 249 255)`],
            hoverOffset: 5,
            borderColor: `rgb(255 255 255)`,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: `right`,
            labels:{
              color: `rgb(255 255 255)`,
            }
          },
        },
      },
    });
}

SummaryChart();

function loadData(){
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


function initialize(){
  // loadUsers()
}
initialize();