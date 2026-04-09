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
                // Endpoints solo para ROLE_ADMON
                .requestMatchers("/usuarios/**","/perfiles/**","/tipos/**","/eventos/**","/reservas/**").hasRole("ADMON")
                // Endpoints solo para ROLE_CLIENTE
                .requestMatchers("/eventos/clientes/**","/reservas/clientes/**").hasRole("CLIENTE")
                .anyRequest().authenticated()
            )
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
}