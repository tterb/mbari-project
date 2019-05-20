# MBARI Spring Project

### Start Here
1. Install [Maven](https://www.baeldung.com/install-maven-on-windows-linux-mac).
2. Install Docker ([Mac](https://docs.docker.com/docker-for-mac/install/), [Windows](https://docs.docker.com/docker-for-windows/install/), 
    [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/), 
    [Debian](https://docs.docker.com/install/linux/docker-ce/debian/), [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/))
    or MongoDB (will require changing the host value in the `application.properties` file)
    - If you're installing on Windows, you must have a Windows 10 Pro or Education license - if you don't have this yet, 
    [upgrade your license](https://support.microsoft.com/en-us/help/12384/windows-10-upgrading-home-to-pro) using the **free** Education license
    [you get as students at CSUMB](https://e5.onthehub.com/WebStore/OfferingDetails.aspx?o=64216561-c8e5-e711-80fa-000d3af41938&ws=e380feae-9b0e-e311-93f3-b8ca3a5db7a1&vsro=8).
3. Launch the application with Docker Compose by typing in your Terminal/Powershell `docker-compose build` and then `docker-compose up`. 
(You want to be sure to at least test it this way, as this is how it will be run by anyone else and how it will be deployed).
    - Stop and delete these containers by using `docker-compose stop` and `docker-compose rm`, respectively.
    - Because we'll be storing our data in MongoDB, the database files are stored in the `./mongo` folder of the repo. To clear your 
    database, delete this folder.
4. Test your code using `mvn test` or by installing the 
[JUnit Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test).
5. Documentation (and a testbed) for your API is automatically generated using [Swagger UI](https://github.com/swagger-api/swagger-ui), 
and hosted from the Spring Boot application itself. 
You can access this at [`localhost:8080/swagger-ui.html`](http://127.0.0.1:8080/swagger-ui.html) when the app is running.