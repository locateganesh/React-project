import { createContext, useEffect, useState } from 'react';

export const ChallengesContext = createContext({
  challenges: [],
  addChallenge: () => {},
  updateChallengeStatus: () => {},
});

export default function ChallengesContextProvider({ children }) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const getLocalData = localStorage.getItem('formData');
    if (getLocalData) {
      setChallenges(JSON.parse(getLocalData));
    }
  },[]);

  function addChallenge(challenge) {
    const newChallenge = [...challenges, {...challenge, id: Math.random().toString(), status: 'active'}];
    // setChallenges((prevChallenges) => [
    //   { ...challenge, id: Math.random().toString(), status: 'active' },
    //   ...prevChallenges,
    // ]);
    setChallenges(newChallenge);
    localStorage.setItem('formData', JSON.stringify(newChallenge));
  }

  function deleteChallenge(challengeId) {
    const newChallenge = [...challenges];
    // setChallenges((prevChallenges) =>
    //   prevChallenges.filter((challenge) => challenge.id !== challengeId)
    // );
    const filterChallenge = newChallenge.filter((challenge) => challenge.id !== challengeId)
    setChallenges(filterChallenge);
    localStorage.setItem('formData', JSON.stringify(filterChallenge));
  }

  function updateChallengeStatus(challengeId, newStatus) {
    // setChallenges((prevChallenges) =>
    //   prevChallenges.map((challenge) => {
    //     if (challenge.id === challengeId) {
    //       return { ...challenge, status: newStatus };
    //     }
    //     return challenge;
    //   })
    // );
    const updateChallange = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        return { ...challenge, status: newStatus };
      } 
      return { ...challenge }
    });
    setChallenges(updateChallange);
    localStorage.setItem('formData', JSON.stringify(updateChallange));
  }

  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}
