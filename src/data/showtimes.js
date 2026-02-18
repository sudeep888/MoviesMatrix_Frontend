export const showtimesMock = {
  Bangalore: [
    {
      theatreId: "th1",
      theatreName: "PVR Orion Mall",
      location: "Rajajinagar",

      shows: [
        {
          movieId: 550,
          movieTitle: "Fight Club",
          showDate: "2026-02-12",

          timings: [
            {
              time: "10:00 AM",
              price: {
                platinum: 400,
                gold: 300,
                silver: 200,
              },
            },

            {
              time: "1:30 PM",
              price: {
                platinum: 420,
                gold: 320,
                silver: 220,
              },
            },

            {
              time: "7:30 PM",
              price: {
                platinum: 450,
                gold: 350,
                silver: 250,
              },
            },
          ],
        },

        {
          movieId: 603,
          movieTitle: "The Matrix",
          showDate: "2026-02-12",

          timings: [
            {
              time: "11:00 AM",
              price: {
                platinum: 380,
                gold: 280,
                silver: 180,
              },
            },

            {
              time: "4:30 PM",
              price: {
                platinum: 420,
                gold: 320,
                silver: 220,
              },
            },
          ],
        },
      ],
    },

    {
      theatreId: "th2",
      theatreName: "INOX Garuda Mall",
      location: "Magrath Road",

      shows: [
        {
          movieId: 550,
          movieTitle: "Fight Club",
          showDate: "2026-02-12",

          timings: [
            {
              time: "9:30 AM",
              price: {
                platinum: 390,
                gold: 290,
                silver: 190,
              },
            },

            {
              time: "3:00 PM",
              price: {
                platinum: 430,
                gold: 330,
                silver: 230,
              },
            },

            {
              time: "8:45 PM",
              price: {
                platinum: 460,
                gold: 360,
                silver: 260,
              },
            },
          ],
        },
      ],
    },
  ],

  Mumbai: [
    {
      theatreId: "th3",
      theatreName: "PVR Phoenix Marketcity",
      location: "Kurla",

      shows: [
        {
          movieId: 550,
          movieTitle: "Fight Club",
          showDate: "2026-02-12",

          timings: [
            {
              time: "10:30 AM",
              price: {
                platinum: 420,
                gold: 320,
                silver: 220,
              },
            },

            {
              time: "2:30 PM",
              price: {
                platinum: 440,
                gold: 340,
                silver: 240,
              },
            },

            {
              time: "7:00 PM",
              price: {
                platinum: 480,
                gold: 380,
                silver: 280,
              },
            },
          ],
        },
      ],
    },
  ],

  Delhi: [
    {
      theatreId: "th4",
      theatreName: "PVR Select Citywalk",
      location: "Saket",

      shows: [
        {
          movieId: 603,
          movieTitle: "The Matrix",
          showDate: "2026-02-12",

          timings: [
            {
              time: "11:30 AM",
              price: {
                platinum: 400,
                gold: 300,
                silver: 200,
              },
            },

            {
              time: "5:00 PM",
              price: {
                platinum: 430,
                gold: 330,
                silver: 230,
              },
            },

            {
              time: "9:30 PM",
              price: {
                platinum: 470,
                gold: 370,
                silver: 270,
              },
            },
          ],
        },
      ],
    },
  ],
};