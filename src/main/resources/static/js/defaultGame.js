{
    const return_tab = document.getElementById("return-tab");
    return_tab.innerHTML = "Exit game";
    return_tab.addEventListener("mouseup", exitGame);

    const game_area_div = document.querySelector("#game-area");

    const title = document.createElement("h1");
    title.setAttribute("style", "text-transform: capitalize");
    title.textContent = itemBoard.relevent_action;

    const instructions = document.createElement("h3");
    instructions.textContent = "Sorry! We don't have this game ready yet! So just click the ingredient!";

    const counter = document.createElement("h1");
    counter.textContent = "countdown";
    let timer = null;

    const game_elements = document.createElement("div");
    game_elements.setAttribute("id", "game_elements");

    game_area_div.appendChild(title);
    game_area_div.appendChild(instructions);
    game_area_div.appendChild(counter);
    game_area_div.appendChild(game_elements);

    let score = 0;
    countdown(3);

    function countdown(value){
        counter.textContent = "Game will start in " + value;
        if(value < 1){
            clearTimeout(timer);
            // counter.textContent = "placeholder";
            counter.parentNode.removeChild(counter);
            loadGame();
        } else {
            value--;
            timer = setTimeout(() => countdown(value), 1000);
        }
    }

    function loadGame(){
        const game = document.createElement("div");
        game.setAttribute("id", "game");

        const ingredient_img = document.createElement("img");
        ingredient_img.setAttribute("id", "ingredient-image");
        const img = document.getElementsByClassName("game-in-progress")[0].firstChild.firstChild.src;
        ingredient_img.setAttribute("src", img);
        ingredient_img.setAttribute("draggable", false);

        game.appendChild(ingredient_img);
        game_elements.appendChild(game);

        playGame();
    }

    function playGame(){
        const target = document.getElementById("ingredient-image");
        target.addEventListener("mousedown", function () {
            if(score > 3){
                endGame();
            }

            let random_left = Math.floor((Math.random() * 70));
            let random_top = Math.floor(Math.random() * 201) - 100;
            let random_scale = Math.floor(Math.random() * 500) + 20;

            target.style.left = random_left + "%";
            target.style.top = random_top + "px";
            target.style.width = random_scale + "px";
            target.style.height = random_scale + "px";
            score++;
        });
    }

    function endGame(){
        M.toast({html: 'Good job!'});
        itemBoard.performAction();
        itemBoard.updateMenu();
        exitGame();
    }

    function customClean(){
        clearTimeout(timer);
    }

    function exitGame(){
        customClean();

        const tab_instance = M.Tabs.getInstance(document.querySelectorAll(".tabs")[0]);
        tab_instance.select("items");

        while(game_area_div.firstChild){game_area_div.removeChild(game_area_div.firstChild);}

        for(let item of document.getElementsByClassName("game-in-progress")){
            item.classList.remove("game-in-progress");
        }

        itemBoard.clearAction();
        return_tab.innerHTML = "Your Items";
        return_tab.removeEventListener("mouseup", exitGame);

        current_game_css.parentNode.removeChild(current_game_css);
        current_game_script.parentNode.removeChild(current_game_script);
    }
}