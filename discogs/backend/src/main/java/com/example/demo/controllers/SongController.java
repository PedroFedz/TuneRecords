package com.example.demo.controllers;

import org.hibernate.mapping.Index;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.WebScraping.GeniusScraping;
import com.example.demo.entity.Song;
import com.example.demo.repository.SongRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@CrossOrigin(origins = "http://localhost:4200")
@RestController()
@RequestMapping("/songs")
public class SongController {


    /**
     * Obtencion de la letra de las canciones a partir de una cancion dada y su artista
     * @param artistName autor de la cancion
     * @param songName canción a obtener los lirycs
     * @return
     */
    @GetMapping
    public ResponseEntity<Object> getSong(@RequestParam("artistName") String artistName, @RequestParam("songName") String songName) {
        
        artistName = GeniusScraping.formatearArtista(artistName);
        System.out.println(artistName);
       
        String lyrics = GeniusScraping.getSong(artistName, songName);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseJson = mapper.createObjectNode();
        responseJson.put("lyrics", lyrics);

        return ResponseEntity.ok().body(responseJson);
    }   

    /**
     * Obtención de la url de la miniatura de la canción dado el artista y la propia cancion
     * @param artistName nombre autor de la cancón
     * @param songName nombre de la propia canción
     * @return
     */
    @GetMapping("/url")
    public ResponseEntity<Object> getSongUrl(@RequestParam("artistName") String artistName, @RequestParam("songName") String songName) {
        
        int index = songName.indexOf("(feat");
        
        if(index != -1) songName = songName.substring(0, index-1);
        songName = songName.replaceAll("\\'", "");
        String url = GeniusScraping.getSongUrl(artistName, songName);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseJson = mapper.createObjectNode();
        responseJson.put("img", url);

        return ResponseEntity.ok().body(responseJson);
    }   


    /**
     * Obtener el url de la imagen que identifica al artista
     * @param artistName nombre del artista 
     * @return
     */
    @GetMapping("/urlArtist")
    public ResponseEntity<Object> getUrl(@RequestParam("artistName") String artistName) {
        
        String url = GeniusScraping.getUrl(artistName);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseJson = mapper.createObjectNode();
        responseJson.put("img", url);

        return ResponseEntity.ok().body(responseJson);
    }

    /**
     * Obtener la url de la imagen de background del artista
     * @param artistName nombre del artista
     * @return
     */
    @GetMapping("/urlBack")
    public ResponseEntity<Object> getUrlBack(@RequestParam("artistName") String artistName) {
        
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseJson = mapper.createObjectNode();
        responseJson.put("imgBack",GeniusScraping.getUrlBack(artistName));

        return ResponseEntity.ok().body(responseJson);
    }


}
