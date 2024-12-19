const { execSync } = require("child_process");
const http = require("http");

module.exports = async (config) => {
  const { containerName, dockerImage, containerPort, hostPort } = config.projects[0].use;

  console.log(`Checking if a container is already running for image: ${dockerImage}`);
  try {
    // Check if a container is already running from the specified image
    const existingContainer = execSync(
      `docker ps --filter "ancestor=${dockerImage}" --format "{{.ID}}"`,
      { stdio: "pipe" }
    ).toString().trim();

    if (existingContainer) {
      console.log(`A container is already running for image ${dockerImage}: ${existingContainer}`);
      console.log(`Skipping container startup.`);
    } else {
      console.log(`No container running for image ${dockerImage}, starting a new one.`);
      execSync(
        `docker run --name ${containerName} --platform linux/amd64 -d -p ${hostPort}:${containerPort} ${dockerImage}`,
        { stdio: "inherit" }
      );
      console.log("Docker container started successfully.");
    }

    // Wait for the container to be ready
    console.log(`Waiting for the container to be accessible on http://localhost:${hostPort}`);
    await waitForContainerReady(hostPort);
    console.log(`Container is now accessible on http://localhost:${hostPort}`);
  } catch (error) {
    console.error("Error checking or starting Docker container:", error.message);
    throw error;
  }
};

// Utility function to check if the container is accessible
async function waitForContainerReady(port, timeout = 30000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            reject(new Error(`Unexpected status code: ${res.statusCode}`));
          }
        });

        req.on("error", reject);
      });

      // If we get here, the container is ready
      return;
    } catch {
      // Wait 500ms before trying again
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Timeout waiting for the container to be ready on port ${port}`);
}