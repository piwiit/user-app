let userData = [];

const fetchUser = async () => {
  await fetch('https://randomuser.me/api/?results=24')
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData[0]);
};

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return newDate;
  };

  const registerDay = (startDate) => {
    let today = new Date().toISOString().slice(0, 10);
    startDate = startDate.slice(0, 10);

    const diffInMs = new Date(today) - new Date(startDate);
    const diffInDays = diffInMs / (1000 * 3600 * 24);
    return diffInDays;
  };

  document.body.innerHTML = userData.map(
    (user) =>
      `
      <div class='card'>
        <img src='${user.picture.large}' alt='photo de ${user.name.first}'>
         <h3>${user.name.first} ${user.name.last}</h3>
         <p>${dateParser(user.dob.date)},<em> ${user.location.city}</em></p>
         <em>Membre depuis : ${registerDay(user.registered.date)} jours</em>
    </div>
    `
  );
};

userDisplay();
