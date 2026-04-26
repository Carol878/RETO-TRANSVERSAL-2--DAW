package eventos.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
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

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // RUTAS PÚBLICAS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs",
                                "/swagger-resources/**",
                                "/webjars/**",
                                "/usuarios/login",
                                "/usuarios/registro")
                        .permitAll()

                        // GET públicos de eventos (HOME + ADMIN)
                        .requestMatchers(HttpMethod.GET, "/eventos/**", "/tipos/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/eventos/{id}").permitAll()

                        // RUTAS DE CLIENTE
                        .requestMatchers("/eventos/clientes/**", "/reservas/clientes/**").hasAnyRole("CLIENTE", "ADMON")

                        // RUTAS DE ADMIN
                        .requestMatchers(HttpMethod.POST, "/eventos/**").hasRole("ADMON")
                        .requestMatchers("/usuarios/**", "/perfiles/**", "/tipos/**", "/reservas/**")
                        .hasRole("ADMON")

                        .anyRequest().authenticated())
                /*
                 * .requestMatchers(HttpMethod.GET, "/eventos/{id}").permitAll()
                 * // Endpoints solo para ROLE_ADMON
                 * .requestMatchers("/usuarios/**","/perfiles/**","/tipos/**","/eventos/**",
                 * "/reservas/**").hasRole("ADMON")
                 * // Endpoints solo para ROLE_CLIENTE
                 * .requestMatchers("/eventos/clientes/**","/reservas/clientes/**").hasRole(
                 * "CLIENTE")
                 * .anyRequest().authenticated()
                 * )
                 */
                // Eliminamos .httpBasic() y agregamos el filtro JWT
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    /*
     * @Bean
     * public AuthenticationManager
     * authenticationManager(AuthenticationConfiguration config) throws Exception {
     * return config.getAuthenticationManager();
     * }
     */

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

        authBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());

        return authBuilder.build();
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
        configuration.setAllowedOrigins(
                Arrays.asList("http://localhost:4200", "https://antdaw25.com"));
        // Permitimos todos los métodos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Permitimos las cabeceras de seguridad
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}