import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Form, SubmitButton, List, Error } from "./styles";
import Container from "../../components/Container";

import api from "../../services/api";

export default class Main extends Component {
  state = {
    newRepo: "",
    repos: [],
    loading: false,
    error: false,
    duplicate: false
  };

  componentDidMount() {
    this.setState({
      repos: JSON.parse(localStorage.getItem("@repos:repositorios")) || []
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.repos !== this.state.repos) {
      localStorage.setItem(
        "@repos:repositorios",
        JSON.stringify(this.state.repos)
      );
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repos } = this.state;

    this.setState({ loading: true, error: false, duplicate: false });

    if (repos.find(repo => repo.name === newRepo)) {
      this.setState({ duplicate: true, loading: false });
    } else
      try {
        const response = await api.get(`/repos/${newRepo}`);

        const data = {
          name: response.data.full_name
        };

        this.setState({ repos: [...repos, data], newRepo: "", loading: false });
      } catch (err) {
        this.setState({ loading: false, error: true });
      }
  };
  render() {
    const { newRepo, loading, error, repos, duplicate } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        {error && <Error>Repositório não encontrado</Error>}
        {duplicate && <Error>Repositório duplicado</Error>}

        <Form onSubmit={this.handleSubmit} Error={!!error || !!duplicate}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={text => this.setState({ newRepo: text.target.value })}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Acessar
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
