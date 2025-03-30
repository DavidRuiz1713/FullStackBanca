package com.david.springboot.banco.springboot_administracion;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // Usa el perfil 'test'
class SpringbootAdministracionApplicationTests {

	@Test
	void contextLoads() {
		// Test vacío que solo verifica que el contexto de Spring se carga
	}
}