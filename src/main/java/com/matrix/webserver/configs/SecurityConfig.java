package com.matrix.webserver.configs;

import com.matrix.webserver.configs.securityHandel.ServerAuthenticationFailureHandler;
import com.matrix.webserver.configs.securityHandel.ServerAuthenticationSuccessHandler;
import com.matrix.webserver.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @ClassName SecurityConfig
 * @Author Create By matrix
 * @Date 2024/4/26 0026 14:37
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    AuthenticationManager authenticationManager;

    /*注入定义的登录响应方法*/
    @Resource
    private ServerAuthenticationSuccessHandler serverAuthenticationSuccessHandler;
    @Resource
    private ServerAuthenticationFailureHandler serverAuthenticationFailureHandler;
    @Resource
    private UserService userService;

    /**
     * PasswordEncoder
     * 明文密码使用 NoOpPasswordEncoder
     * 加密用BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        /*明文*/
        //return NoOpPasswordEncoder.getInstance();
        /*加密*/
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorizeHttpRequests->
                        authorizeHttpRequests
                                // 放行静态资源
                                // 允许所有OPTIONS请求:HttpMethod.OPTIONS,
                                .requestMatchers(HttpMethod.GET,"/css/**","/fonts/**","/img/**","/js/**","/upload/**").permitAll()
                                // 允许 SpringMVC 的默认错误地址匿名访问
                                .requestMatchers("/errorPage","/openApi/**").permitAll()
                                // 允许直接访问授权登录接口
                                .requestMatchers(HttpMethod.POST,"/login","/register").permitAll()
                                .anyRequest().authenticated()
        );
        http.formLogin(formLogin->
                formLogin
                        .loginPage("/login")
                        .loginProcessingUrl("/login")//登录表单action的名字或者Ajax中的url
                        .usernameParameter("account")
                        .passwordParameter("password")
                        //.failureUrl("/errorPage")//错误页面
                        //.defaultSuccessUrl("/index")//成功页面
                        .successHandler(serverAuthenticationSuccessHandler)
                        .failureHandler(serverAuthenticationFailureHandler)
                        .permitAll()

        );
        // 6.2版本要使用 csrf.disable()而不是withDefault()方法,网上很多使用withDefault()方法
        http.csrf(csrf->csrf.disable());
        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userService);
        ProviderManager pm = new ProviderManager(daoAuthenticationProvider);
        return pm;
    }
}
