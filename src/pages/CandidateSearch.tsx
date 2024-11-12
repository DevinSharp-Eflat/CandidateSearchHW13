import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { Box, Button, Divider, Stack } from '@mui/material';

const addCandidate = (candidate: Candidate) => {
  const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
  const updatedCandidates = [...savedCandidates, candidate];
  localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
};

const CandidateSearch = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [candidates, setCandidates] = useState([] as Candidate[]);
  const [candidateData, setCandidateData] = useState({} as Candidate);
  const [candidatesLeft, setCandidatesLeft] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithub();
      setCandidates(data);
      const candidateData = await searchGithubUser(data[selectedIndex].login);
      setCandidateData(candidateData);
      setSelectedIndex(selectedIndex);
      setCandidatesLeft(true);
    }
    fetchData();
  }, []);

  const nextCandidate = async () => {
    const nextIndex = selectedIndex + 1;
    if (nextIndex > candidates.length) {
      setCandidatesLeft(false);
    }
    else {
      setSelectedIndex(nextIndex);
      const candidateData = await searchGithubUser(candidates[nextIndex].login);
      setCandidateData(candidateData);
    }
  }

  return (
    <>
      <h1>CandidateSearch</h1>
      {candidatesLeft ? (
        <Box>
          <img src={`${candidateData.avatar_url}`} width="100" height="100" />
          <Divider orientation='horizontal' />
          <h2>{candidateData.name}</h2>
          <p>Location: {candidateData.location}</p>
          <p>Email: {candidateData.email}</p>
          <p>Company: {candidateData.company}</p>
          <p>Bio: {candidateData.bio}</p>
          <Stack direction={"row"} spacing={20} sx={{ alignContent: 'center' }}>
            <Button
              onClick={() => { nextCandidate(); }}
            >Pass</Button>
            <Button
              onClick={() => { addCandidate(candidateData); nextCandidate(); }}
            >Add</Button>
          </Stack>
        </Box>

      ) : (
        <h2>No candidates left</h2>
      )}
    </>
  );
}

export default CandidateSearch;
