import { useState, useEffect } from 'react';
import { GitHubRepo } from '../../@types/GitHubRepo';
import SearchBar from '../SearchBar/SearchBar';
import Message from '../Message/Message';
import ReposResults from '../ReposResults/ReposResults';
import logo from '../../assets/images/logo-github.png';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [searchDone, setSearchDone] = useState(false);
  const [message, setMessage] = useState({ text: '', type: 'info' });

  useEffect(() => {
    if (searchQuery) {
      const perPage = 9;
      const url = `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;

      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Requête échouée');
        })
        .then((data) => {
          setSearchResults((prevResults) => [...prevResults, ...data.items]);

          if (data.items.length === 0) {
            setMessage({ text: 'Aucun résultat trouvé', type: 'error' });
          } else {
            setMessage({
              text: `La recherche a réussi. ${data.items.length} repos trouvés`,
              type: 'info',
            });
          }
          setSearchDone(true);
        })
        .catch(() => {
          setMessage({
            text: "Une erreur s'est produite lors de la recherche",
            type: 'error',
          });
        });
    }
  }, [searchQuery, page]);

  const handleSearchChange = (query: string) => {
    setPage(1);
    setSearchQuery(query);
    setSearchResults([]);
  };

  const loadMoreResults = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <SearchBar onSearch={handleSearchChange} />
      <Message text={message.text} type={message.type} />
      <ReposResults results={searchResults} />
      {searchDone && (
        <button type="button" onClick={loadMoreResults}>
          Plus de résultats
        </button>
      )}
    </div>
  );
}

export default App;
