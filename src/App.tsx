import { useEffect, useState } from 'react'
import { PixelStreamingWrapper } from './components/PixelStreaming'

function App() {
  const [pslink, setPslink] = useState<string | null>(null)
  const [ipPort, setIpPort] = useState<string | null>(null)
  const [ip80, setIp80] = useState<string | null>(null)
  const [psLinkPort, setPsLinkPort] = useState<string | null>(null)


  useEffect(() => {
    fetch('https://api.convai.com/xp/streams/createWithScene', {
      method: 'POST',
      headers: {
        'CONVAI-API-KEY': '2c37cc3c56366df491563a87624a0221',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "scene_id": "4b9d5455-2ba7-4770-b54a-cb3793dffa7e",
        "use_edit_mode": true,
        "allocate_server": true,
        "experience_mode": "av_sim"
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data && data.stream_address) {
          setPslink(data.stream_address);
          setPsLinkPort(data.stream_address.replace(/:\d+/, ":80"));
          setIpPort(`https:\\${data.ip_address}:80`);
          setIp80(`http:\\${data.ip_address}:80`);
          console.log(psLinkPort, pslink, ipPort, ip80)
        } else {
          console.error('No stream URL returned from the API');
        }
      })
      .catch(error => {
        console.error('Error fetching the stream:', error);
      });
  }, []);



  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100%'
        }}
      >
        {
          pslink &&
          <PixelStreamingWrapper
            initialSettings={{
              AutoPlayVideo: true,
              AutoConnect: true,
              ss: pslink,
              StartVideoMuted: true,
              HoveringMouse: true,
              WaitForStreamer: true
            }}
          />
        }
        {/* { */}
        {/*   psLinkPort && */}
        {/*   <PixelStreamingWrapper */}
        {/*     initialSettings={{ */}
        {/*       AutoPlayVideo: true, */}
        {/*       AutoConnect: true, */}
        {/*       ss: psLinkPort, */}
        {/*       StartVideoMuted: true, */}
        {/*       HoveringMouse: true, */}
        {/*       WaitForStreamer: true */}
        {/*     }} */}
        {/*   /> */}
        {/* } */}
        {/* { */}
        {/*   ip80 && */}
        {/*   <PixelStreamingWrapper */}
        {/*     initialSettings={{ */}
        {/*       AutoPlayVideo: true, */}
        {/*       AutoConnect: true, */}
        {/*       ss: ip80, */}
        {/*       StartVideoMuted: true, */}
        {/*       HoveringMouse: true, */}
        {/*       WaitForStreamer: true */}
        {/*     }} */}
        {/*   /> */}
        {/* } */}
        {/* { */}
        {/*   ipPort && */}
        {/*   <PixelStreamingWrapper */}
        {/*     initialSettings={{ */}
        {/*       AutoPlayVideo: true, */}
        {/*       AutoConnect: true, */}
        {/*       ss: ipPort, */}
        {/*       StartVideoMuted: true, */}
        {/*       HoveringMouse: true, */}
        {/*       WaitForStreamer: true */}
        {/*     }} */}
        {/*   /> */}
        {/* } */}
      </div>
    </>
  )
}

export default App
