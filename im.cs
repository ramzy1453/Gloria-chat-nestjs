IEnumerator Login(string email, string password)
    {
        WWWForm form = new WWWForm();
        form.AddField("email", email);
        form.AddField("password", password);

        using (UnityWebRequest request = UnityWebRequest.Post("https://api.earthmeta.ai/api/login", form))
        {

            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success) {
                // Request succeeded
                Debug.Log("Login request succeeded!");

                // Get the response data as a string
                string responseText = request.downloadHandler.text;
                Debug.Log("Response: " + responseText);

                // Deserialize the JSON response into data object
                LoginResponse res = JsonUtility.FromJson<LoginResponse>(responseText);
                PlayerPrefs.SetString("token", res.data.token);
                Debug.Log("Token: " + PlayerPrefs.GetString("token"));
                UIManager.instance.ChangePage(nextPage);
            }
            else {
                // Request failed
                Debug.LogError("Login request failed: " + request.error);
            }
        }
    }
