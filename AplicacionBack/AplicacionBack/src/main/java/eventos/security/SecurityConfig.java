package eventos.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/login",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/v3/api-docs/**",
                        "/v3/api-docs",
                        "/swagger-resources/**",
                        "/webjars/**",
                        "/usuarios/login",
                        "/usuarios/registro",
                        "/eventos/"
                    ).permitAll()
                .requestMatchers(HttpMethod.GET, "/eventos/{id}").permitAll()
                
                // 1º PONEMOS PRIMERO LAS RUTAS ESPECÍFICAS DE CLIENTES
                .requestMatchers("/eventos/clientes/**","/reservas/clientes/**").hasRole("CLIENTE")
                
                // 2º PONEMOS DEBAJO LAS RUTAS GENERALES DE ADMIN
                .requestMatchers("/usuarios/**","/perfiles/**","/tipos/**","/eventos/**","/reservas/**").hasRole("ADMON")
                
                .anyRequest().authenticated()
            )
                /*.requestMatchers(HttpMethod.GET, "/eventos/{id}").permitAll()
                // Endpoints solo para ROLE_ADMON
                .requestMatchers("/usuarios/**","/perfiles/**","/tipos/**","/eventos/**","/reservas/**").hasRole("ADMON")
                // Endpoints solo para ROLE_CLIENTE
                .requestMatchers("/eventos/clientes/**","/reservas/clientes/**").hasRole("CLIENTE")
                .anyRequest().authenticated()
            )*/
            // Eliminamos .httpBasic() y agregamos el filtro JWT
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return "{noop}" + rawPassword; // Solo para pruebas
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                if (encodedPassword.startsWith("{noop}")) {
                    return encodedPassword.substring(6).equals(rawPassword.toString());
                }
                // Si no tiene {noop}, asumimos BCrypt (o podrías usar BCrypt internamente)
                return new BCryptPasswordEncoder().matches(rawPassword, encodedPassword);
            }
        };
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Damos permiso explícito a tu Angular
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:9000/eventos/"));
        // Permitimos todos los métodos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Permitimos las cabeceras de seguridad
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}