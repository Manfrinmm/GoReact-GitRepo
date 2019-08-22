import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../services/api";

import { FaSpinner } from "react-icons/fa";
import { Loading, Owner, IssueList, Button } from "./styles";
import Container from "../../components/Container";

export default class Repository extends Component {
  static propsTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string
      })
    }).isRequired
  };

  state = {
    repo: {},
    issues: [],
    loading: true,
    loadingPage: false,
    page: 1,
    filter: "all"
  };

  async componentDidMount() {
    this.loadItens();
  }

  loadItens = async () => {
    const { match } = this.props;
    const { page, filter } = this.state;

    this.setState({ loadingPage: true });

    const repoName = decodeURIComponent(match.params.repo);

    const [{ data: repo }, { data: issues }] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page
        }
      })
    ]);

    this.setState({ repo, issues, loading: false, loadingPage: false });
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) this.loadItens();
  }

  handlePageButton = value => {
    const { page } = this.state;
    this.setState({ page: value + page });
  };

  handlePageInput = value => {
    this.setState({ page: value });
  };

  handleFilter = filter => {
    this.setState({ filter }, () => this.loadItens());
  };

  render() {
    const { repo, issues, loading, page, loadingPage, filter } = this.state;

    if (loading) {
      return (
        <Loading>
          Carregando
          <FaSpinner color="#fff" size={30} />
        </Loading>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </Owner>

        <IssueList>
          <div>
            <Button
              active={filter === "all"}
              onClick={() => this.handleFilter("all")}
            >
              Todas
            </Button>
            <Button
              active={filter === "open"}
              onClick={() => this.handleFilter("open")}
            >
              Abertas
            </Button>
            <Button
              active={filter === "closed"}
              onClick={() => this.handleFilter("closed")}
            >
              Fechadas
            </Button>
          </div>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        {loadingPage && <h2>Carregando...</h2>}
        <footer>
          <button
            disabled={page === 1 && 1}
            style={{ opacity: page === 1 && 0.5 }}
            onClick={() => this.handlePageButton(-1)}
          >
            Prev
          </button>
          <input
            type="number"
            onChange={e => this.handlePageInput(e.target.value)}
            value={page}
            min={1}
          />
          <button onClick={() => this.handlePageButton(+1)}>Next</button>
        </footer>
      </Container>
    );
  }
}
