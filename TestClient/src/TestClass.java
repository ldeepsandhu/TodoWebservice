import netscape.javascript.JSException;
import netscape.javascript.JSObject;
import org.json.simple.JSONObject;

import java.io.*;


import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

 /*
 This is test class which is used to test the services.
 Author - Lovedeep
  */

public class TestClass {

    public static void main(String[] args)
    {
        testUpdateListTodoItem();
    }

    public static void testCreateTodo()
    {
        String url = "http://localhost:8000/api/todos";
        JSONObject userCredential = new JSONObject();
        userCredential.put("title", "second-todo");
        sendRequest(url, userCredential.toString());
    }


    public static void testCreateTodoItem()
    {
        String url = "http://localhost:8000/api/todos/1/items";
        JSONObject userCredential = new JSONObject();
        userCredential.put("content", "second todo item, inside first todo");
        sendRequest(url, userCredential.toString());
    }

    public static void testUpdateTodoItem()
    {
        String url = "http://localhost:8000/api/todos/1";
        JSONObject userCredential = new JSONObject();
        userCredential.put("title", "first todo now modified");
        sendRequest(url, userCredential.toString());
    }

    public static void testUpdateListTodoItem()
    {
        String url = "http://localhost:8000/api/todos/1/updateitem";
        JSONObject userCredential = new JSONObject();
        userCredential.put("complete", "true");
        sendRequest(url, userCredential.toString());
    }

    public static void sendRequest(String url, String body)
    {
        HttpURLConnection con;
        try {
            URL myurl = new URL(url);
            con = (HttpURLConnection) myurl.openConnection();
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            OutputStreamWriter wr= new OutputStreamWriter(con.getOutputStream());
            wr.write(body);
            wr.flush();
            int statusCode = con.getResponseCode();
            System.out.println("Response code is " + statusCode);
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String line;
            StringBuilder content = new StringBuilder();
            while ((line = in.readLine()) != null) {
                content.append(line);
                content.append(System.lineSeparator());
            }
            System.out.println(content.toString());
        }
        catch(MalformedURLException ex)
        {
            System.out.println(ex.toString());
        }
        catch(IOException ex)
        {
            System.out.println(ex.toString());
        }
    }
}
