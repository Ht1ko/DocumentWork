package app.controller;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.message.request.LoginForm;
import app.message.request.SignUpForm;
import app.message.response.JwtResponse;
import app.message.response.ResponseMessage;
import app.model.Document;
import app.model.Role;
import app.model.RoleName;
import app.model.User;
import app.repo.DocumentService;
import app.repo.RoleRepository;
import app.repo.UserRepository;
import app.security.jwt.JwtProvider;
import app.security.services.UserPrinciple;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    DocumentService docServ;
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;
    public Long id;

    private Long userId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (((UserPrinciple) auth.getPrincipal()).getId() != null) {
            return ((UserPrinciple) auth.getPrincipal()).getId();
        }
        return null;
    }

    @PostMapping("/edit")
    public void addEdit(@Valid @RequestBody Long id) {
        Document doc = docServ.findById(id);
        this.id = doc.getId();
    }

    @GetMapping("/edit")
    public Document edit() {

        Document doc = docServ.findById(this.id);
        return doc;
    }

    @GetMapping("/home/{page}")
    public Page<Document> documents(@PathVariable int page) {
        try {
            Page<Document> doc = docServ.findByUserId(userId(), page);
            return doc;
        } catch (Exception e) {
            return null;
        }

    }

    @PostMapping("/editDocument")
    public ResponseEntity<?> edit(@Valid @RequestBody Document doc) {
        if (docServ.findById(id) != null) {
            docServ.update(doc, userId());
            return new ResponseEntity<>(new ResponseMessage("Document edited!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseMessage("Document not found!"), HttpStatus.OK);
    }

    @PostMapping("/addDocument")
    public ResponseEntity<?> add(@Valid @RequestBody Document doc) {
        Document document = new Document(doc.getTitle(), doc.getContent(), doc.getDate(), doc.getContractOwner(),
                doc.getContractTarget(), doc.getDateEnd());
        docServ.save(document, userId());

        return new ResponseEntity<>(new ResponseMessage("Document added!"), HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @GetMapping("/admin/{page}")
    public Page<Document> adminpage(@PathVariable int page) {
        Page<Document> doc = docServ.findAll(page);
        return doc;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
            case "admin":
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(adminRole);

                break;
            case "pm":
                Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(pmRole);

                break;
            default:
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(userRole);
            }
        });

        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }
}