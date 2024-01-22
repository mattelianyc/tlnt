import React, { useRef, useState } from 'react';
import { Video } from 'expo-av';
import styled from 'styled-components/native';

const VideoContainer = styled.View`
  flex: 1;
  background-color: black;
`;

const StyledVideo = styled(Video)`
  flex: 1;
`;

const VideoPlayer = ({ videoUri }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <VideoContainer>
      <StyledVideo
        ref={videoRef}
        source={videoUri}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(status)}
      />
    </VideoContainer>
  );
};

export default VideoPlayer;
