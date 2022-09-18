import React, {useState} from 'react';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [resData, setResData] = useState('');
  const [userRepos, setUserRepos] = useState('');
   
  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    
    // methods of fetching the data
    // XMLHttpRequest
    // fetch
    // axios
    // async await
    fetch('https://api.github.com/users/'+ username)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResData(data);
    });

    // 'https://api.github.com/users/SarfrazSiddiqi/repos'
    
    fetch('https://api.github.com/users/'+username+'/repos')
    .then(response => response.json())
     .then(data => {
      console.log(data);
      setUserRepos(data);
           });
   
    setUsername('');
  }

 
  return (
    <>
      <div className='container'>
        <div className='title'>Enter GitHub User Name</div>
        <form onSubmit={handleSubmit} className='formCard'>
          <input type="text" onChange={handleUsernameInput} value={username}/>
          <button>Submit</button>
        </form>

        {resData.message}

        {/* conditional rendering */}
        { resData && (resData.message !== 'Not Found') && (
            <div className='userDetailCard'>
              <div className='userDetailBody'>
                <p className='name'>{resData.name}</p>
                <em className='username'>{resData.login}</em>
                <div className='follow'>
                  <p>Followers : {resData.followers}</p>
                  <p>Following : {resData.following}</p>
                </div>
                <div className='profDetail'>
                  {/* <p>🏢 {resData.company}</p> */}
                  {/* <p>🗒️ {resData.bio}</p> */}
                  <p>🗒️ Total Repos {resData.public_repos}</p>
                  <>
                  {Array.isArray(userRepos) ? (userRepos).map(e => <p><li>{e.name}</li></p>) : null}

                </>
                  
                    
                 </div>
              </div>
              <div className='userImage'>
                <img src={resData.avatar_url} alt="avatar"/>
              </div>
            </div>
          )
        }

      </div>
    </>
  );
}

export default App;
