import { useEffect, useState } from 'react'
import { PixelStreamingWrapper } from './components/PixelStreaming'

function App() {
  const [pslink, setPslink] = useState<string | null>(null)
  const [ipPort, setIpPort] = useState<string | null>(null)
  const [ip80, setIp80] = useState<string | null>(null)
  const [psLinkPort, setPsLinkPort] = useState<string | null>(null)
  const [finalRedirect, setFinalRedirect] = useState<string | null>(null)
  // const staticIp = "wss://ps-convai-ps-ugc-deployment-vm-instance-1727187589838-1.convai.com:443/?sessionid=feed8ff0-7b26-11ef-93c0-42010a7be011";

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
          setPsLinkPort(data.stream_address.replace(/:\d+/, ":8888"));
          setIpPort(`https://${data.ip_address}:80`);
          setIp80(`http://${data.ip_address}:80`);
          setFinalRedirect(data.finalRedirectURL)
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
        {finalRedirect &&
          pslink &&
          <PixelStreamingWrapper
            initialSettings={{
              AutoPlayVideo: true,
              AutoConnect: true,
              ss: finalRedirect,
              StartVideoMuted: true,
              HoveringMouse: true,
              WaitForStreamer: true
            }}
          />
        }
        {/* { */}
        {/*   pslink && */}
        {/*   <PixelStreamingWrapper */}
        {/*     initialSettings={{ */}
        {/*       AutoPlayVideo: true, */}
        {/*       AutoConnect: true, */}
        {/*       ss: pslink, */}
        {/*       StartVideoMuted: true, */}
        {/*       HoveringMouse: true, */}
        {/*       WaitForStreamer: true */}
        {/*     }} */}
        {/*   /> */}
        {/* } */}
        {/* { */}
        {/*   psLinkPort && */}
        {/*   <PixelStreamingWrapper */}
        {/*     initialSettings={{ */}
        {/*       AutoPlayVideo: true, */}
        {/*       AutoConnect: true, */}
        {/*       ss: staticIp, */}
        {/*       StartVideoMuted: true, */}
        {/*       HoveringMouse: true, */}
        {/*       WaitForStreamer: true, */}
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
      <div>
        Ip Port : {ipPort}
      </div>
      <div>
        psLink : {pslink}
      </div>
      <div>
        ip80 : {ip80}
      </div>
      <div>
        psLinkPort : {psLinkPort}
      </div>
    </>
  )
}

export default App
