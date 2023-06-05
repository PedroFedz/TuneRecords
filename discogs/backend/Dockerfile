FROM --platform=linux/amd64 maven:3.8.5-openjdk-17 as build
# speed up Maven JVM a bit
ENV MAVEN_OPTS="-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
# set working directory
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN sh mvnw install -DskipTests

EXPOSE 8081

CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]