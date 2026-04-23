package eventos.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 1. Si la ruta es /login, no procesamos JWT y dejamos pasar
        if (request.getRequestURI().equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Para el resto de rutas, verificamos el token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtService.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

    /*
     * @Override
     * protected void doFilterInternal(HttpServletRequest request,
     * HttpServletResponse response,
     * FilterChain filterChain) throws ServletException, IOException {
     * 
     * String path = request.getRequestURI();
     * String method = request.getMethod();
     * 
     * // Rutas públicas que NO deben pasar por el filtro JWT
     * if (path.equals("/login") ||
     * path.equals("/usuarios/login") ||
     * path.equals("/usuarios/registro") ||
     * path.startsWith("/swagger-ui") ||
     * path.startsWith("/v3/api-docs") ||
     * path.equals("/error") ||
     * 
     * // GET públicos de eventos
     * (path.startsWith("/eventos") && method.equals("GET"))) {
     * 
     * filterChain.doFilter(request, response);
     * return;
     * }
     * 
     * // --- Lógica JWT normal ---
     * final String authHeader = request.getHeader("Authorization");
     * final String jwt;
     * final String username;
     * 
     * if (authHeader == null || !authHeader.startsWith("Bearer ")) {
     * filterChain.doFilter(request, response);
     * return;
     * }
     * 
     * jwt = authHeader.substring(7);
     * username = jwtService.extractUsername(jwt);
     * 
     * if (username != null &&
     * SecurityContextHolder.getContext().getAuthentication() == null) {
     * UserDetails userDetails =
     * this.userDetailsService.loadUserByUsername(username);
     * if (jwtService.validateToken(jwt, userDetails)) {
     * UsernamePasswordAuthenticationToken authToken = new
     * UsernamePasswordAuthenticationToken(
     * userDetails,
     * null,
     * userDetails.getAuthorities());
     * authToken.setDetails(new
     * WebAuthenticationDetailsSource().buildDetails(request));
     * SecurityContextHolder.getContext().setAuthentication(authToken);
     * }
     * }
     * 
     * filterChain.doFilter(request, response);
     * }
     */

}