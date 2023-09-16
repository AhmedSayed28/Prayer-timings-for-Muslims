import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip, Divider, Grid } from "@mui/material";
import CardType from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/ar-dz";
function MainContent() {
  const [selectedCity, setSelectedCity] = React.useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });
  const getTimings = async () => {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=eg`
    );
    setTime(res.data.data.timings);
    console.log(res.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);
  const [time, setTime] = useState({});
  const [prayer, setPrayer] = useState(0);
  const [today, setToday] = useState();
  const [remainingTTime, setRemainingTime] = useState();

  useEffect(() => {
    let interval = setInterval(() => {
      setUpCountDownTimer();
    }, 1000);
    const t = moment();
    setToday(t.format(" dddd , Do MMMM  YYYY / h:mm a "));
    return () => clearInterval(interval);
  }, [time]);

  const setUpCountDownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(time["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(time["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(time["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(time["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setPrayer(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = time[nextPrayerObject.key];
    const nextPrayerMoment = moment(nextPrayerTime, "hh:mm");
    let remainingTime = moment(nextPrayerMoment, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midNight = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidNight = nextPrayerMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiff = midNight + fajrToMidNight;
      remainingTime = totalDiff;
    }
    console.log(remainingTime);
    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`
    );
    console.log(
      durationRemainingTime.hours(),
      durationRemainingTime.minutes(),
      durationRemainingTime.seconds()
    );
  };

  const handleCityChange = (event) => {
    const cityObj = availableCities.find((city) => {
      return city.apiName === event.target.value;
    });
    setSelectedCity(cityObj);
  };

  const availableCities = [
    {
      displayName: "القاهرة",
      apiName: "Cairo",
    },
    {
      displayName: "المنيا",
      apiName: "Minya",
    },
    {
      displayName: "اسـيوط",
      apiName: "Assiut",
    },
    {
      displayName: "أسـوان",
      apiName: "Aswan",
    },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            <h3>{today}</h3>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <h3>متبقي حتي صلاة {prayersArray[prayer].displayName}</h3>
            <h1>{remainingTTime}</h1>
          </div>
        </Grid>
        <Grid xs={12}>
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "#444",
              },
            }}
            variant='middle'
          >
            <Chip
              style={{
                background: "#333",
                color: "snow",
                fontWeight: "bolder",
              }}
              label='مواقـيـت الـصـلاة'
            />
          </Divider>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={4} md={2.4}>
          <CardType
            name='الفجر'
            time={time.Fajr}
            image='https://media.aldawlanews.com/img/22/10/12/1005697.jpg'
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4}>
          <CardType
            name='الظهر'
            time={time.Dhuhr}
            image='https://www.vetogate.com/Upload/libfiles/467/1/91.jpg'
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4}>
          <CardType
            name='العصر'
            time={time.Asr}
            image='https://i.ytimg.com/vi/GEKiVawkLMk/hqdefault.jpg'
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4}>
          <CardType
            name='المغرب'
            time={time.Maghrib}
            image='https://i1.wp.com/www.elfagr.org/UploadCache/libfiles/509/1/600x338o/472.jpeg?w=600&ulb=true'
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4}>
          <CardType
            name='العشاء'
            time={time.Isha}
            image='https://i1.sndcdn.com/artworks-000429317547-8hu4fh-t500x500.jpg'
          />
        </Grid>
      </Grid>

      <Box>
        <FormControl style={{ width: "14vw", marginTop: "40px" }}>
          <InputLabel
            style={{ fontWeight: "bolder", color: "snow" }}
            id='demo-simple-select-label'
          >
            المدينة
          </InputLabel>
          <Select
            style={{ color: "snow" }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={selectedCity.displayName}
            label='المدينة'
            onChange={handleCityChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default MainContent;
