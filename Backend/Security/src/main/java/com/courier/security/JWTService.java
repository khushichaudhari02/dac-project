package com.courier.security;


import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JWTService {


    private SecretKey secretkey;

    public JWTService() {

        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            secretkey = keyGen.generateKey();
            
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

//    public String generateToken(String username) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("id",new Users());
//        
//        return Jwts.builder()
//                .claims()
//                .add(claims)
//                .subject(username)
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 30))
//                .and()
//                .signWith(secretkey)
//                .compact();
//
//    }
    public String generateToken(Authentication authentication) {
		//log.info("generate jwt token " + authentication);//contains verified user details
		UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
//JWT : userName,issued at ,exp date,digital signature(does not typically contain password , can contain authorities
		return Jwts.builder() // JWTs : a Factory class , used to create JWT tokens
				.setSubject((userPrincipal.getUsername())) // setting subject part of the token(typically user
															// name/email)
				.setIssuedAt(new Date())// Sets the JWT Claims iat (issued at) value of current date
				.setExpiration(new Date((new Date()).getTime() + 60*60*60*30))// Sets the JWT Claims exp
																					// (expiration) value.
				// setting a custom claim , to add granted authorities
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				// setting a custom claim , to add user id (remove it if not required in the project)
				.claim("user_id",userPrincipal.getUser().getId())
		
				.signWith(secretkey) // Signs the constructed JWT using the specified
															// algorithm with the specified key, producing a
															// JWS(Json web signature=signed JWT)

				// Using token signing algo : HMAC using SHA-512
				.compact();// Actually builds the JWT and serializes it to a compact, URL-safe string
	}
private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
	String authorityString = authorities.stream().
			map(authority -> authority.getAuthority())
			.collect(Collectors.joining(","));
	System.out.println(authorityString);
	return authorityString;
}

	public Claims validateToken(String jwtToken) {
		// try {
		Claims claims = Jwts.parserBuilder() //create JWT parser
				.setSigningKey(secretkey) //sets the SAME secret key for JWT signature verification
				.build()//rets the JWT parser set with the Key
				.parseClaimsJws(jwtToken) //rets JWT with Claims added in the body
				.getBody();//=> JWT valid ,  rets the Claims(payload
		return claims;		
	}

	public Authentication populateAuthenticationTokenFromJWT(String jwt) {
		Claims payloadClaims = validateToken(jwt);
		String email = payloadClaims.getSubject();
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		Long userId= Long.valueOf((int)payloadClaims.get("user_id"));

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email,userId,authorities);
		System.out.println("is authenticated "+token.isAuthenticated());//true
		return token;
	}

	private List<GrantedAuthority> getAuthoritiesFromClaims(Claims payloadClaims) {
		String authString = (String) payloadClaims.get("authorities");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		authorities.forEach(System.out::println);
		return authorities;
	}




}