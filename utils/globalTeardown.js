const { execSync } = require("child_process");

module.exports = async (config) => {
  const { containerName, dockerImage, containerPort, hostPort } = config.projects[0].use;

  // Stop any container running the specified image
  console.log(`Cleaning up any container running the image: ${dockerImage}`);
  try {
    const existingContainer = execSync(
      `docker ps --filter "ancestor=${dockerImage}" --format "{{.ID}}"`,
      { stdio: "pipe" }
    ).toString().trim();

    if (existingContainer) {
      console.log(`Stopping existing container running image ${dockerImage}: ${existingContainer}`);
      execSync(`docker stop ${existingContainer}`, { stdio: "inherit" });
      execSync(`docker rm ${existingContainer}`, { stdio: "inherit" });
    } else {
      console.log(`No existing container is running the image ${dockerImage}.`);
    }
  } catch (error) {
    console.error("Error cleaning up existing containers:", error.message);
  }
};