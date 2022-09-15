package springboot.restful.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import springboot.restful.model.entity.Genre;
import springboot.restful.model.enums.EGenre;
import springboot.restful.repository.GenreRepository;

import java.util.ArrayList;
import java.util.List;

//@Component
public class InitGenreData{

    @Autowired
    private GenreRepository genreRepository;


    public void initData(){

        List<Genre> genres = new ArrayList<>();

        genres.add(new Genre(1,String.valueOf(EGenre.ACTION)));
        genres.add(new Genre(2,String.valueOf(EGenre.COMEDIES)));
        genres.add(new Genre(3,String.valueOf(EGenre.ANIMATION)));
        genres.add(new Genre(4,String.valueOf(EGenre.DOCUMENTARIES)));
        genres.add(new Genre(5,String.valueOf(EGenre.ROMANACE)));
        genres.add(new Genre(6,String.valueOf(EGenre.HOLLYWOOD)));
        genres.add(new Genre(7,String.valueOf(EGenre.CRIME)));
        genres.add(new Genre(8,String.valueOf(EGenre.THRILLER)));
        genres.add(new Genre(9,String.valueOf(EGenre.DRAMAS)));
        genres.add(new Genre(10,String.valueOf(EGenre.ANIME)));
        genreRepository.saveAll(genres);

    }
}
