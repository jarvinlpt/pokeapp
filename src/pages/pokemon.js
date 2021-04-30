import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { POKEMON_ENDPOINT } from '../utils/urlConstants';
import { Row, Col, Card, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

export const Pokemon = () => {
  const { id } = useParams();
  const [data, setData] = useState({ name: '', sprites: {}, moves: [] });
  const history = useHistory();

  //fetch pokemon data
  useEffect(() => {
    Axios.get(`${POKEMON_ENDPOINT}/${id}`).then((res) => {
      setData({
        name: res.data.name,
        sprites: res.data.sprites,
        moves: res.data.moves,
      });
    });
  }, [id]);

  //iterate through nested sprites
  // const iterateSprites = (obj) => {
  //   Object.keys(obj).forEach((key) => {
  //     console.log(`key: ${key}, value: ${obj[key]}`);

  //     if (typeof obj[key] === 'object') {
  //       iterateSprite(obj[key]);
  //     }
  //   });
  // };

  return (
    <>
      {data && (
        <Row justify='center' style={{ marginBottom: 50 }}>
          <Col>
            <h1>{data.name.toUpperCase()}</h1>
            {id > 1 && (
              <Button
                onClick={() => {
                  history.push(`/pokemon/${Number(id) - 1}`);
                }}
              >
                {' '}
                Previous{' '}
              </Button>
            )}
            <Button
              onClick={() => {
                history.push('/');
              }}
            >
              Back to home
            </Button>
            <Button
              onClick={() => {
                history.push(`/pokemon/${Number(id) + 1}`);
              }}
            >
              {' '}
              Next{' '}
            </Button>
          </Col>
          <Col span={24}>
            <Row align='middle' style={{ marginTop: '35px' }}>
              <Col>
                <h2>Default sprites</h2>
                <Row>
                  {Object.entries(data.sprites).map((key) => {
                    return (
                      <>
                        {typeof key[1] === 'string' && (
                          <>
                            {key[1] && (
                              <Col span={8}>
                                <Card
                                  cover={
                                    <img src={key[1]} style={{ width: 100 }} />
                                  }
                                ></Card>
                              </Col>
                            )}
                          </>
                        )}
                      </>
                    );
                  })}
                </Row>
              </Col>
              <Col>
                <h2>Other sprites</h2>
                <Row>
                  {Object.entries(data.sprites).map((key) => {
                    return (
                      <>
                        {key[0] === 'other' &&
                          Object.entries(key[1]).map((other) => {
                            return (
                              <>
                                <h3>
                                  {other[0] === 'dream_world'
                                    ? 'Dream World'
                                    : 'Official Artwork'}
                                </h3>
                                {Object.entries(other[1]).map((sprite) => {
                                  return (
                                    <>
                                      {sprite[1] && (
                                        <Col>
                                          <Card
                                            cover={
                                              <img
                                                src={sprite[1]}
                                                style={{ width: 100 }}
                                              />
                                            }
                                          ></Card>
                                        </Col>
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
                      </>
                    );
                  })}
                </Row>
              </Col>
              <Col>
                <h2>Versions</h2>
                <Row>
                  {Object.entries(data.sprites).map((key) => {
                    return (
                      <>
                        {key[0] === 'versions' &&
                          Object.entries(key[1]).map((version) => {
                            // iterateSprites(version[1]);
                          })}
                      </>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <Row>
              <h2>Move sets</h2>
              {data.moves.map((move) => {
                return (
                  <Col span={2}>
                    <Card>{move.move.name}</Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Pokemon;
