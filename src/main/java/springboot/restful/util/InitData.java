package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import springboot.restful.repository.GenreRepository;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.SeatRepository;

//@Component
public class InitData implements CommandLineRunner {


    @Override
    public void run(String... args) throws Exception {
        InitGenreData initGenreData = new InitGenreData();
        InitTheaterData  initTheaterData = new InitTheaterData();
        InitSeatData initSeatData = new InitSeatData();
        InitRoleData initRoleData = new InitRoleData();
        initGenreData.initData();;
        initRoleData.initData();;
        initSeatData.initData();
        initTheaterData.initData();
    }
}
