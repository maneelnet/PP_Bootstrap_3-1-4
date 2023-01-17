package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;
import java.security.Principal;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private RoleService roleService;
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping()
    public String showUsers(Model model, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        model.addAttribute("users", userService.usersList());
        model.addAttribute("userInfo", user);
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", roleService.rolesList());
        return "admin";
    }

    @PostMapping("/save")
    public String create(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/profile")
    @ResponseBody
    public User showUserProfileModal(@PathVariable("id") Long userId) {
        return userService.showUser(userId);
    }


    @PatchMapping()
    public String updateUser(User user) {
        userService.updateUser(user);

        return "redirect:/admin";
    }

    @DeleteMapping()
    public String deleteUser(User user) {
        userService.deleteUser(user.getId());
        return "redirect:/admin";
    }

    @GetMapping("modals/modal")
    public String modal1(Model model) {
        model.addAttribute("name","Sam");
        return "modal";
    }

}
