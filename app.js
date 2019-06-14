console.log('app.js loaded');

$(document).ready(function() {

  //use jQuery selector to get Dom elements
  let $form = $('#submit');
  let $input = $('#inputZip');
  let $radioOption1 = $('#inlineRadio1');
  let $radioOption2 = $('#inlineRadio2');
  let $errorMessage = $('#errorMessage');
  //current weather area
  let $time = $('#time');
  let $icon = $('#icon');
  let $description = $('#description');
  let $temp = $('#temp');
  //forecast weather areas
  let $timeF1 = $('#timeF1');
  let $iconF1 = $('#iconF1');
  let $desF1 = $('#desF1');
  let $tempF1 = $('#tempF1');
  let $timeF2 = $('#timeF2');
  let $iconF2 = $('#iconF2');
  let $desF2 = $('#desF2');
  let $tempF2 = $('#tempF2');
  let $timeF3 = $('#timeF3');
  let $iconF3 = $('#iconF3');
  let $desF3 = $('#desF3');
  let $tempF3 = $('#tempF3');

  //hide error message first
  hideErrorMessage();
  //after user typing in zip code, selecting the unit for temperature, user submits info
  $form.on('submit', getData);

  function getData(event) {
    //prevent refreshing page
    event.preventDefault();
    //empty all render areas first
    $time.empty();
    $icon.empty();
    $description.empty();
    $temp.empty();
    $timeF1.empty();
    $iconF1.empty();
    $desF1.empty();
    $tempF1.empty();
    $timeF2.empty();
    $iconF2.empty();
    $desF2.empty();
    $tempF2.empty();
    $timeF3.empty();
    $iconF3.empty();
    $desF3.empty();
    $tempF3.empty();

    //get user's zipCode
    zipCode = $input.val();

    //get user's unit of temperature
    if ($radioOption1[0].checked) {
      units = "imperial";
      fOrC = "°F";
    } else {
      units = "metric";
      fOrC = "°C";
    }
    //hide error message first
    hideErrorMessage();
    //data validation zip code
    checkValid(zipCode);

    //request API data (current weather) from openweathermap.org
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=${units}&appid=${config.apiKey}`)
      .then(function(response) {

        let icon = response.weather[0].icon;
        let iconLink = `http://openweathermap.org/img/w/${icon}.png`;
        let description = response.weather[0].main;
        let temp = response.main.temp;
        temp = temp.toFixed(1);

        $time.text('NOW');
        $icon.html("<img src=" + `${iconLink}` + ">");
        $description.text(description);
        $temp.text(`${temp}${fOrC}`);

      })
      .fail(function() {
        console.log('something went wrong');
      })

    //request API data (forecast weather) from openweathermap.org
    $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=${units}&appid=${config.apiKey}`)
      .then(function(response) {

        let timeF1 = "NEXT 3 HOURS";
        let iconF1 = response.list[0].weather[0].icon;
        let iconLinkF1 = `http://openweathermap.org/img/w/${iconF1}.png`;
        let desF1 = response.list[0].weather[0].main;
        let tempF1 = response.list[0].main.temp;
        tempF1 = tempF1.toFixed(1);
        $timeF1.text(timeF1);
        $iconF1.html("<img src=" + `${iconLinkF1}` + ">");
        $desF1.text(desF1);
        $tempF1.text(`${tempF1}${fOrC}`);

        let timeF2 = "NEXT 6 HOURS";
        let iconF2 = response.list[1].weather[0].icon;
        let iconLinkF2 = `http://openweathermap.org/img/w/${iconF2}.png`;
        let desF2 = response.list[1].weather[0].main;
        let tempF2 = response.list[1].main.temp;
        tempF2 = tempF2.toFixed(1);
        $timeF2.text(timeF2);
        $iconF2.html("<img src=" + `${iconLinkF2}` + ">");
        $desF2.text(desF2);
        $tempF2.text(`${tempF2}${fOrC}`);

        let timeF3 = "NEXT 9 HOURS";
        let iconF3 = response.list[2].weather[0].icon;
        let iconLinkF3 = `http://openweathermap.org/img/w/${iconF3}.png`;
        let desF3 = response.list[2].weather[0].main;
        let tempF3 = response.list[2].main.temp;
        tempF3 = tempF3.toFixed(1);
        $timeF3.text(timeF3);
        $iconF3.html("<img src=" + `${iconLinkF3}` + ">");
        $desF3.text(desF3);
        $tempF3.text(`${tempF3}${fOrC}`);
      })
  }

  function checkValid(zipCode) {
    console.log(zipCode);
    if (zipCode.length !== 5) {
      $errorMessage.show();
    }
  }

  function hideErrorMessage() {
    $errorMessage.hide();
  }

})
