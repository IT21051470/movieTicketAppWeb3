const { ethers } = require('hardhat');
const fs = require('fs');

// Function to get a random timestamp for a future day
function getRandomFutureTimestamp() {
  const todayTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const oneDayInSeconds = 24 * 60 * 60; // Number of seconds in a day
  const randomDaysToAdd = Math.floor(Math.random() * 30); // Generate a random number between 0 and 29 for up to 30 days in the future
  return todayTimestamp + randomDaysToAdd * oneDayInSeconds;
}

async function main() {
  const Contract = await ethers.getContractFactory('DappCinemas');
  const contract = await Contract.deploy();
  await contract.deployed();

  const movies = [
    {
      name: 'Spider-Man: Across the Spider-Verse',
      imageUrl: 'https://weliveentertainment.com/wp-content/uploads/2023/05/across-spider-verse-banner-4.jpg',
      genre: 'Animated, Action, Adventure, Comedy, Sci-Fi',
      description: 'Miles Morales returns for an epic adventure across the multiverse, teaming up with Gwen Stacy and a new team of Spider-People to face a new threat.',
    },
    {
      name: 'Iron Man',
      imageUrl: 'https://i0.wp.com/vrscout.com/wp-content/uploads/2022/10/IronManVRQuest2.jpg?resize=810%2C479&ssl=1',
      genre: 'Action',
      description: 'Iron Man is the superhero persona of Anthony Edward "Tony" Stark, a businessman and engineer who runs the company Stark Industries. Beginning his career as a',
    },
    // Add more random movies with details and image URLs here
    {
      name: 'Avengers: Endgame',
      imageUrl: 'https://cdn.vox-cdn.com/thumbor/0pVHGAg4ouVXI3RO4n2gayhNahQ=/0x0:1920x1080/920x613/filters:focal(887x293:1193x599):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/64224190/surprise_marvel_releases_a_new_full_trailer_and_poster_for_avengers_endgame_social.0.jpg',
      genre: 'Action, Adventure, Sci-Fi',
      description: 'The Avengers assemble one final time to undo Thanos\' actions and save the universe.',
    },
    {
      name: 'Jurassic Park',
      imageUrl: 'https://www.filmink.com.au/wp-content/uploads/2023/06/main1-2-793x446.jpg',
      genre: 'Adventure, Sci-Fi, Thriller',
      description: 'Dinosaurs come back to life in this thrilling adventure park, leading to chaos and danger for the visitors.',
    },
  ];

  for (const movie of movies) {
    await contract.addMovie(movie.name, movie.imageUrl, movie.genre, movie.description);
  }

  // Generate a random future day timestamp
  const randomFutureTimestamp = getRandomFutureTimestamp();

  // Add time slots with the random future day timestamp for Spider-Man and Iron Man
  await contract.addTimeslot(
    1, // Movie ID (e.g., Spider-Man)
    [randomFutureTimestamp], // Random future day
    [18000], // Start time in seconds (e.g., 5 hours)
    [19800], // End time in seconds (e.g., 5 hours 30 minutes)
    [20], // Capacity (20 tickets available)
    [ethers.utils.parseEther('0.02')] // Ticket cost in ether (0.02 ETH)
  );

  await contract.addTimeslot(
    2, // Movie ID (e.g., Iron Man)
    [randomFutureTimestamp], // Random future day
    [25200], // Start time in seconds (e.g., 7 hours)
    [27000], // End time in seconds (e.g., 7 hours 30 minutes)
    [20], // Capacity (20 tickets available)
    [ethers.utils.parseEther('0.03')] // Ticket cost in ether (0.03 ETH)
  );

  // Add time slots for Avengers: Endgame and Jurassic Park
  await contract.addTimeslot(
    3, // Movie ID (e.g., Avengers: Endgame)
    [randomFutureTimestamp], // Random future day
    [18000], // Start time in seconds (e.g., 5 hours)
    [19800], // End time in seconds (e.g., 5 hours 30 minutes)
    [20], // Capacity (20 tickets available)
    [ethers.utils.parseEther('0.02')] // Ticket cost in ether (0.02 ETH)
  );

  await contract.addTimeslot(
    4, // Movie ID (e.g., Jurassic Park)
    [randomFutureTimestamp], // Random future day
    [25200], // Start time in seconds (e.g., 7 hours)
    [27000], // End time in seconds (e.g., 7 hours 30 minutes)
    [20], // Capacity (20 tickets available)
    [ethers.utils.parseEther('0.03')] // Ticket cost in ether (0.03 ETH)
  );

  const address = JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deployed contract address', contract.address);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
