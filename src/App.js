import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
//////////////////////////////////////////////////
import Home from "./pages/Home";
import LogedInHome from "./pages/LogedInHome";
import Category from "./pages/Category";
import SpecifcCategory from "./pages/SpecificCategory";
import Movie from "./pages/Movie";
import SpecifcMovie from "./pages/SpecifcMovie";
import Actor from "./pages/Actor";
import SpecifcActor from "./pages/SpecificActor";
import Lists from "./pages/Lists";
import "./App.css";
//////////////////////////////////////////////////
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//////////////////////////////////////////////////
function App() {
  //////////////////////////////////////////////////
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1A1A1A",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto",
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
    },
  });
  //////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<LogedInHome />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/SpecifcCategory/:id" element={<SpecifcCategory />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/SpecifcMovie/:id" element={<SpecifcMovie />} />
          <Route path="/Actor" element={<Actor />} />
          <Route path="/SpecifcActor/:id" element={<SpecifcActor />} />
          <Route path="/Lists" element={<Lists />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
/* Real Examples To Test */
/*  const movies = [
    {
      title: "Inception",
      description:
        "A skilled thief is given a chance at redemption if he can successfully perform inception, the act of planting an idea into a target's subconscious.",
    },
    {
      title: "The Dark Knight",
      description:
        "Batman faces the Joker, a criminal mastermind who seeks to create chaos and challenge Batman's moral code.",
    },
    {
      title: "Interstellar",
      description:
        "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      title: "The Matrix",
      description:
        "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    },
    {
      title: "Gladiator",
      description:
        "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.",
    },
    {
      title: "Avengers: Endgame",
      description:
        "The remaining Avengers must find a way to reverse the damage caused by Thanos and restore balance to the universe.",
    },
    {
      title: "Titanic",
      description:
        "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    },
    {
      title: "Jurassic Park",
      description:
        "Scientists clone dinosaurs to populate a theme park which soon goes horribly wrong.",
    },
    {
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      title: "Forrest Gump",
      description:
        "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with a low IQ.",
    },
  ]; */
/* const movies = [
  {
    title: "Inception",
    description:
      "A skilled thief is given a chance at redemption if he can successfully perform inception, the act of planting an idea into a target's subconscious.",
    category: "Science Fiction",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    ratings: 8.8,
  },
  {
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who seeks to create chaos and challenge Batman's moral code.",
    category: "Action",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ratings: 9.0,
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    category: "Science Fiction",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    ratings: 8.6,
  },
  {
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    category: "Science Fiction",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    ratings: 8.7,
  },
  {
    title: "Gladiator",
    description:
      "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.",
    category: "Action",
    actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    ratings: 8.5,
  },
  {
    title: "Avengers: Endgame",
    description:
      "The remaining Avengers must find a way to reverse the damage caused by Thanos and restore balance to the universe.",
    category: "Action",
    actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    ratings: 8.4,
  },
  {
    title: "Titanic",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    category: "Romance",
    actors: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
    ratings: 7.8,
  },
  {
    title: "Jurassic Park",
    description:
      "Scientists clone dinosaurs to populate a theme park which soon goes horribly wrong.",
    category: "Adventure",
    actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    ratings: 8.1,
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    category: "Drama",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    ratings: 9.3,
  },
  {
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with a low IQ.",
    category: "Drama",
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    ratings: 8.8,
  },
]; */
/* const categories = [
  {
    name: "Action",
  },
  {
    name: "Romance",
  },
  {
    name: "Comedy",
  },
  {
    name: "Horror",
  },
  {
    name: "Family",
  },
  {
    name: "Christmas",
  },
  {
    name: "Science Fiction",
  },
  {
    name: "Historical",
  },
  {
    name: "Educational",
  },
  {
    name: "Mafia",
  },
  {
    name: "Spy",
  },
  {
    name: "AI",
  },
  {
    name: "Earthquake",
  },
  {
    name: "Mystery",
  },
  {
    name: "National",
  },
  {
    name: "Sports",
  },
]; */
/////////////////////////////////////////////////
/* const actors = [
  {
    name: "Chris Evans",
    birthDate: "June 13, 1981",
  },
  {
    name: "Angelina Jolie",
    birthDate: "June 4, 1975",
  },
  {
    name: "Tom Hanks",
    birthDate: "July 9, 1956",
  },
  {
    name: "Brad Pitt",
    birthDate: "December 18, 1963",
  },
  {
    name: "Al Pacino",
    birthDate: "April 25, 1940",
  },
  {
    name: "Tom Cruise",
    birthDate: "July 3, 1962",
  },
  {
    name: "Ben Affleck",
    birthDate: "August 15, 1972",
  },
  {
    name: "Tom Holland",
    birthDate: "June 1, 1996",
  },
]; */
