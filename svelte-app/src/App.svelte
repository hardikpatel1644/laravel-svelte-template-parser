<script>
  import { TemplateEngine, convertJsonObj } from "./common/helper";
  import { BASE_API_URL, REQUEST_HEADERS } from "./common/constants";
  export let templateInput = "Its {{#if isWeekday }} not {{#end}}the weekend!";
  export let yamlInput = "isWeekday: true";
  let parsedYamlInput = {}
  export let result = "";
  export let templateInputHint = "Hello {{name}}";
  export let yamlInputHint = "name: User1";
  export let resultHint = "Hello User1";

  /**
   * Handle submit operation
   */
  async function handleSubmit() {
    if (templateInput && yamlInput) {
      await callApi();  
      result = TemplateEngine(templateInput, parsedYamlInput); // Compile TempateEngine
    } else {
      result = "Please enter values as per the given example";
    }
  }

  /**
   *  Call Api to parse yaml Input 
   */

  async function callApi() {
    try {
      const apiURL = BASE_API_URL + "parse";
      const response = await fetch(apiURL, {
        body: JSON.stringify({
          templateInput: templateInput,
          yamlInput: yamlInput,
        }),
        headers: REQUEST_HEADERS,
        method: "POST",
      });

      if (!response.ok) {
        result = "An error occurred" + Error(`${response.status} ${response.statusText}`);
      } else {
        if (response.status == 200 || response.status == 201) {
          parsedYamlInput = await response.json();
        }
      }
    } catch (error) {
      console.log("An error occurred ", error);
    }
  }
</script>

<form class="form-signin" on:submit|preventDefault={handleSubmit} method="post">
  <div class="text-center mb-4">
    <h1 class="h3 mb-3 font-weight-normal">PHP-Svelte-Yaml-Template APP</h1>
  </div>

  <div class="form-label-group">
    <input
      type="text"
      name="templateInput"
      class="form-control"
      bind:value={templateInput}
    />
    <label for="inputEmail">Template Input</label>
  </div>

  <div class="form-label-group">
    <input
      type="text"
      name="yamlInput"
      class="form-control"
      bind:value={yamlInput}
    />
    <label for="inputPassword">Yaml Input</label>
  </div>

  <button class="btn btn-lg btn-primary btn-block" type="submit"
    >Display Result</button
  >
  <hr />
  <h4 class="text-center alert-warning">Example</h4>
  <p class=" text-muted text-center alert-warning">
    Template Input = {templateInputHint} <br />
    Yaml Input = {yamlInputHint} <br />
    Output = {resultHint}
  </p>
  <hr />
  <h4 class="text-center alert-success">Result</h4>
  {#if result}
    <p class="text-center alert-success">{@html result }</p>

  {/if}
</form>
