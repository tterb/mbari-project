# Build our project with a Maven/Java Docker container
FROM maven:3.6.0-jdk-8-alpine as build

# copy the project files
COPY ./pom.xml ./pom.xml

# build all dependencies for offline use
RUN mvn dependency:go-offline -B

# Change to directory /app
WORKDIR /app
# Copy all our files into our Docker container
COPY ./ /app
# Build our Spring app
RUN mvn clean package -Dmaven.test.skip=true

# Make our final container with the OpenJDK
FROM openjdk:8-jre-alpine
WORKDIR /app
# Copy our JAR from the build stage into our final container
COPY --from=build /app/target/app.jar /app
# Expose port 8080 for Spring
EXPOSE 8080
# Launch the Spring app when the container is started
CMD ["java", "-jar", "app.jar"]