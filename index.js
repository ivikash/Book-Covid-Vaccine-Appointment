const notifier = require('node-notifier');
const fetch = require('node-fetch');

const getDataFromSafeway = async () => {
  const res = await fetch("https://s3-us-west-2.amazonaws.com/mhc.cdn.content/vaccineAvailability.json?v=1618115674739", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,ja;q=0.8,ms;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://mhealthcheckin.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  });
  return res.json();
}

const fetchResponse = async () => {
  const x = await getDataFromSafeway()
  /**
   * To find your nearest Safeway, add zip code to the following filter:
   *
   * const sf = x.filter(i => i.address.includes("San Francisco, CA") && i.address.includes("94115"))
   */
  const sf = x.filter(i => i.address.includes("San Francisco, CA"))
  const available = sf.filter(i => i.availability === "yes")

  console.log('Available: ', available);

  if (available.length) {
    notifier.notify({
      title: "Vaccine  Available",
      message: JSON.stringify(available, null, 2),
      sound: true,
      timeout: 2
    })
  }
}


fetchResponse()
