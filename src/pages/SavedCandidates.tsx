import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { Box, Button, Divider, List, Stack } from '@mui/material';

const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates] = useState([] as Candidate[]);

  useEffect(() => {
    setSavedCandidates(JSON.parse(localStorage.getItem("savedCandidates") || "[]"));
  })

  const removeCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    const candidateIndex = savedCandidates.find((cand: Candidate, x: number) => {
      if (cand.name === candidate.name){
        return x;
      }
    });
    savedCandidates.splice(candidateIndex, 1);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    setSavedCandidates(savedCandidates);
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <Box sx ={{ width:'100%'}}>
        {savedCandidates && savedCandidates.map(candidate => (
        <List>
          <Box sx={{p: 2, border: "2px solid black"}}>
          <Stack direction="row">
            <img src={`${candidate.avatar_url}`} width="100" height="100" />
            <Divider orientation='horizontal'/>
            <p>{candidate.name}</p>
            <Divider orientation='horizontal'/>
            <p>{candidate.location}</p>
            <Divider orientation='horizontal'/>
            <p>{candidate.email}</p>
            <Divider orientation='horizontal'/>
            <p>{candidate.company}</p>
            <Divider orientation='horizontal'/>
            <p>{candidate.bio}</p>
            <Divider orientation='horizontal'/>
            <Button
              onClick={() => { removeCandidate(candidate)}}
            >Remove</Button>
          </Stack>
          </Box>
        </List>
        ))}
      </Box>
    </>
  );
};

export default SavedCandidates;
