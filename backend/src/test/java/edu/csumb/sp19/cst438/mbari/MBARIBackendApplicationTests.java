package edu.csumb.sp19.cst438.mbari;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.testcontainers.containers.GenericContainer;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(initializers = MBARIBackendApplicationTests.Initializer.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MBARIBackendApplicationTests {
    @Autowired
    WebApplicationContext webApplicationContext;

    private MockMvc mvc;
    private ObjectMapper mapper = new ObjectMapper();
    static final int portOfDB = 27017;

    // Launch a MongoDB container when we test our project
    @ClassRule
    public static GenericContainer mongo = new GenericContainer("mongo:4").withExposedPorts(portOfDB);

    // Assign the host/portOfDB of the container to the application
    public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        @Override
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues values = TestPropertyValues.of(
                  "spring.data.mongodb.host=" + mongo.getContainerIpAddress(),
                  "spring.data.mongodb.port=" + mongo.getMappedPort(portOfDB)
            );
            values.applyTo(configurableApplicationContext);
        }
    }

    // Make call with MVC
    @Before
    public void beforeTest() {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    // Test that our Spring application successfully launches with our MongoDB Docker container
    @Test
    public void a_Program_Launches() throws Exception {}
}
