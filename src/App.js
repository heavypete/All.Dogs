import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import "./App.scss";

const myApiKey = "17460dc6-8492-40f2-abd5-62c692647c6c";
const url = "https://api.thedogapi.com/v1/images/search?limit=24";

function App() {
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState("main");
  const [detailsDog, setDetailsDog] = useState(null);

  // data fetch
  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setDogs([...data]);
    })();
  }, []);

  // simulation of 2 pages

  const togglePage = (dog = null) => {
    const _page = page === "main" ? "details" : "main";
    setDetailsDog({ ...dog });
    setPage(_page);
    console.log(page);
  };

  const getBreedName = (dog) => {
    if (dog.breeds.length === 0) {
      return "(no breed info)";
    } else {
      return dog.breeds[0].name;
    }
  };

  return (
    <div className="App">
      <h1> All the Dogs</h1>

      {/* MAIN PAGE */}
      {page === "main" && (
        <Flex className="container" flexWrap="wrap">
          {dogs.map((dog, index) => {
            return (
              <Box key={index} w="100%" p={6} color="white" className="dog">
                <h3>{getBreedName(dog)}</h3>
                <img src={dog.url} onClick={() => togglePage(dog)} alt="dog" />
              </Box>
            );
          })}
        </Flex>
      )}
      {/* BREED DETAIL PAGE */}
      {page === "details" && (
        <div>
          <Button
            colorScheme="teal"
            size="lg"
            align="center"
            onClick={togglePage}
            className="returnButton"
          >
            {" "}
            Go Back
          </Button>
          {detailsDog.breeds.length > 0 && (
            <div>
              <h2>{detailsDog.breeds[0].name}</h2>
              <div className="temperament">
                {detailsDog.breeds[0].temperament}
              </div>
            </div>
          )}
          <img src={detailsDog.url} alt="dog" />
        </div>
      )}
    </div>
  );
}

export default App;
