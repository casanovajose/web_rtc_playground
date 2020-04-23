const constraints = {
  "video": true,
  "audio": true
}

const openMediaDevices = async (c) => {
  return await navigator.mediaDevices.getUserMedia(c);
}

const getConnectedDevices = async (type) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === type);
}

const updateCameraList = (cameras) => {
  const listElement = document.querySelector("select#availableCameras");
    listElement.innerHTML = "";
    cameras.map(camera => {
        const cameraOption = document.createElement("option");
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
        return cameraOption;
    })
    .forEach(c => {
      console.log(c);
      listElement.add(c, null);
    });
}

// for real use dependency injection
async function init() {
  try {
    const stream = await openMediaDevices(constraints);
    console.log("Yep MediaStream", stream);

    const videoCameras = await getConnectedDevices("videoinput");
    console.log("Video Cameras", videoCameras);
    updateCameraList(videoCameras);
    // update camera list
    navigator.mediaDevices.addEventListener("devicechange", e  => {
      const newCameraList = getConnectedDevices("videoinput");
      updateCameraList(newCameraList);
    });

  } catch (error) {
    // PermissionDeniedError
    // NotFoundError
    console.error("ERROR Can't access media devices", error);
  }
}

init();