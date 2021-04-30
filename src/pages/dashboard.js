import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { DASHBOARD_ENDPOINT } from '../utils/urlConstants';
import { Row, Col, Card } from 'antd';
import { useHistory } from 'react-router-dom';

export const Dashboard = () => {
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const history = useHistory();

  //add 'id' && 'url' to initial fetched data
  const getPokemonData = async (pokemonList) => {
    const currentList = allPokemonList;
    const pokeArray = [];

    for (const pokemon in pokemonList) {
      const pokemonData = await Axios.get(pokemonList[pokemon].url);
      const id = pokemonData.data.id;
      const name = pokemonList[pokemon].name;
      const sprite = pokemonData.data.sprites.front_default;
      const url = pokemonList[pokemon].url;
      pokeArray.push({ id: id, name: name, sprite: sprite, url: url });
    }
    const newList = currentList.concat(pokeArray);
    setAllPokemonList(newList);
    setIsLoading(false);
  };

  //fetch pokemon data
  useEffect(() => {
    Axios.get(`${DASHBOARD_ENDPOINT}${offset}`).then((res) => {
      setIsLoading(true);
      getPokemonData(res.data.results);
    });
  }, [offset]);

  //check if bottom of page
  useEffect(() => {
    const element = document.getElementsByClassName('pokeapp')[0];

    const onScroll = (e) => {
      setScroll(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);
    if (window.innerHeight + scroll >= element.clientHeight) {
      console.log(loading);
      if (!loading) {
        setIsLoading(true);
        setOffset((current) => Number(current) + 25);
      }
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [scroll]);

  return (
    <Row justify='center' style={{ marginBottom: 50 }}>
      <Col>
        <h1>PokeApp</h1>
      </Col>
      <Col span={24}>
        <Row align='middle' style={{ marginTop: '35px' }} className='pokeapp'>
          {allPokemonList ? (
            <>
              {allPokemonList.map((pokemon, index) => {
                return (
                  <Col span={8}>
                    <div style={{ display: 'inline' }}>
                      <Card
                        hoverable
                        cover={
                          <img src={pokemon.sprite} style={{ width: 150 }} />
                        }
                        onClick={() => history.push(`/pokemon/${pokemon.id}`)}
                      >
                        <Card.Meta title={`#${pokemon.id} ${pokemon.name}`} />
                      </Card>
                    </div>
                  </Col>
                );
              })}
              {loading && <h1>loading....</h1>}
            </>
          ) : (
            <>No Pokemon to show</>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
