package springboot.restful.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import springboot.restful.config.AppConstant;
import springboot.restful.model.entity.Role;
import springboot.restful.model.enums.ERole;
import springboot.restful.repository.RoleRepository;

import java.util.ArrayList;
import java.util.List;

//@Component
public class InitRoleData implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {

        List<Role> roles = new ArrayList<>();
        roles.add(new Role(AppConstant.ROLE_ADMIN, ERole.ROLE_ADMIN));
        roles.add(new Role(AppConstant.ROLE_USER,ERole.ROLE_USER));
        roleRepository.saveAll(roles);
    }
}
