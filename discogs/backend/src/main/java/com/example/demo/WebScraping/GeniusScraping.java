package com.example.demo.WebScraping;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.util.regex.Pattern;


public class GeniusScraping {


    /**
     * Obtencion mediante web Scraping de la imagen de atras del artista
     * @param artist
     * @return
     */
    public static String getUrlBack(String artist){
        String result = "";

        String url = "https://genius.com/artists/" + artist.replace(" ", "-");

        try{
            String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
            Document doc = Jsoup.connect(url).userAgent(userAgent).get();

            Element element = doc.select("[class^=banner_image-blurred_image]").get(0);
            

            result = element.attr("style");
            //Obtencion exclusiva de la url eliminando propiedades del css
            result = result.substring(result.indexOf("url") + 5, result.length() - 3);

        }catch(IOException ex){
            ex.printStackTrace();
        }

        return result;
    }




    /**
     * Obtencion de la url de la caratula del artista por medio de webScraping
     * @param artist artista por el cual obtener la url
     * @return
     */
    public static String getUrl(String artist){
        String result = "";

        String url = "https://genius.com/artists/" + artist.replace(" ", "-");

        try{
            String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
            Document doc = Jsoup.connect(url)
                            .userAgent(userAgent)
                            .get();

            Element element = doc.select("[class^=user_avatar profile_header-avatar]").get(0);

            result = element.attr("style");
            //Obtencion exclusiva de la url eliminando propiedades del css
            result = result.substring(result.indexOf("url") + 5, result.length() - 3);

        }catch(IOException ex){
            ex.printStackTrace();
        }

        return result;
    }


    /**
     * Obtencion de la url de la caratula de la cancion dado un artista y una cancion 
     * @param artist autor de la cancion a obtener la caratula 
     * @param song cancion a obtener
     * @return
     */
    public static String getSongUrl(String artist, String song){
        String result = "";
        String url = "https://genius.com/" + artist.replace(" ", "-") + "-" + song.replace(" ", "-") + "-lyrics";
        try{

            String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
            Document doc = Jsoup.connect(url)
                            .userAgent(userAgent)
                            .get();

            Elements elements = doc.getElementsByTag("img");
            result = elements.get(1).attr("src");


        }catch(IOException ex){
            ex.printStackTrace();
        }

        return result;
    }


    /**
     * Obtencion de la letra de la cancion a partir del artista y del nombre de dicha cancion
     * @param @param artist autor de la cancion a obtener la caratula 
     * @param song cancion a obtener
     * @return
     */
    public static String getSong(String artist, String song){
        String result = "";
        String url = "https://genius.com/" + artist.replace(" ", "-") + "-" + song.replace(" ", "-") + "-lyrics";
        try{

            String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
            Document doc = Jsoup.connect(url)
                            .userAgent(userAgent)
                            .get();

            Element container = doc.getElementById("lyrics-root");

            Elements letra = container.select("[class^=Lyrics__Container]");

            String htmlRegex = "<[^>]+>";

            Pattern pattern = Pattern.compile(htmlRegex);
        
            

            for (Element element : letra) {
                result += element.html();
                result.replace("<br>", "\n");
            }

            result = pattern.matcher(result).replaceAll("");

        }catch(IOException ex){
            ex.printStackTrace();
        }

        return result;

    }

    /**
     * Cambio de formato de la cancion para obtener la url tal y como nos indica la web de genius
     * @param songName nombre de la cancion a formatear
     * @return
     */
    public static String formatearSong(String songName){
         int index = songName.indexOf("(feat");
        
         if(index != -1) songName = songName.substring(0, index-1);
         songName = songName.replaceAll("\\'", "");
         return null;
    }


  /**
     * Cambio de formato del artista para obtener la url tal y como nos indica la web de genius
     * @param artista nombre del artista a formatear
     * @return
     */
    public static String formatearArtista(String artista){

        artista = artista.replaceAll(",", "");

        artista = artista.replaceAll("&", "and");

        artista = artista.replaceAll(" ", "-");

        return artista;

    }
    

}



