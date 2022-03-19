let grille =
        [
        [8,1,0,0,4,6,9,7,3],
        [4,6,3,7,8,9,5,1,2],
        [9,7,5,1,2,3,8,6,4],
        [6,8,4,3,7,2,1,9,5],
        [5,3,7,4,9,1,6,2,8],
        [2,9,1,6,5,8,3,4,7],
        [1,5,6,2,3,4,7,8,9],
        [3,2,8,9,6,7,4,5,1],
        [7,4,9,8,1,5,2,3,6]
        ];

        function Inversion_PL(grille)
        {
            let gl = Math.floor(Math.random() * 3) * 3;
            let pl1 = gl + Math.floor(Math.random() * 3);
            let pl2 = gl + Math.floor(Math.random() * 3);
            if (pl1 != pl2)
            {
                for (let i = 0; i < 9; i++)
                {
                let tmp = grille[pl1][i];
                grille[pl1][i] = grille[pl2][i];
                grille[pl2][i] = tmp;
                }
            }
            return grille;
        }

        function Inversion_PC(grille)
        {
            let gc = Math.floor(Math.random() * 3) * 3;
            let pc1 = gc + Math.floor(Math.random() * 3);
            let pc2 = gc + Math.floor(Math.random() * 3);
            if (pc1 != pc2)
            {
                for (let i = 0; i < 9; i++)
                {
                    let tmp = grille[i][pc1];
                    grille[i][pc1] = grille[i][pc2];
                    grille[i][pc2] = tmp;
                }
            }
            return grille;
        }

        function Inversion_GL(grille)
        {
            let gc1 = Math.floor(Math.random() * 3) * 3;
            let gc2 = Math.floor(Math.random() * 3) * 3;
            if(gc1 != gc2)
            {
                for (let i = 0; i < 9; i++)
                {
                    for(let j = 0; j < 3; j++)
                    {
                        let tmp = grille[gc1 + j][i];
                        grille[gc1 + j][i] = grille[gc2 + j][i];
                        grille[gc2 + j][i] = tmp;
                    }
                }
            }
            return grille;
        }

        function Inversion_GC(grille)
        {
            let gl1 = Math.floor(Math.random() * 3) * 3;
            let gl2 = Math.floor(Math.random() * 3) * 3;
            if(gl1 != gl2)
            {
                for (let i = 0; i < 9; i++)
                {
                    for(let j = 0; j < 3; j++)
                    {
                        let tmp = grille[i][gl1 + j];
                        grille[i][gl1 + j] = grille[i][gl2 + j];
                        grille[i][gl2 + j] = tmp;
                    }
                }
            }
            return grille;
        }

        function Rotation(grille, n)
        {
            if (n == 0)
            {
                return grille;
            }
            let tmp = new Array(9);
            for (let i = 0; i < 9; i++)
            {
                tmp[i] = new Array(9);
            }
            for (let x = 0; x < 9; x++)
            {
                for (let y = 0; y < 9; y++)
                {
                    tmp[y][8-x] = grille[x][y];
                }
            }
            return (Rotation(tmp, n - 1));
        }

        function RandomList()
        {
            let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let index, rng, tmp;
            for (index = 0; index < list.length; index++)
            {
                rng = Math.floor(Math.random() * (index + 1));
                tmp = list[index];
                list[index] = list[rng];
                list[rng] = tmp;
            }
            return list;
        }

        function Inversion_Alphabet(grille)
        {
            let list = RandomList();
            for (let l = 0; l < 9; l++)
            {
                for (let c = 0; c < 9; c++)
                {
                    let index = grille[l][c] -1;
                    if (grille[l][c] != 0)
                    {
                        grille[l][c] = list[index];
                    }
                }
            }
        }

        function Remplir(grille)
        {
            let tabhtml = document.querySelectorAll("#grille td");
            let i = 0;
            for (let x = 0; x < 9; x++)
            {
                for (let y = 0; y < 9; y++)
                {
                    if (grille[x][y] == 0) tabhtml[i].innerText = "";
                    else tabhtml[i].innerText = grille[x][y];
                    i++;
                }
            } 
        }

        function Chiffres()
        {
            let tabchif = document.querySelectorAll("#chiffres td");
            for (let i = 0; i < 9; i++)
            {
                tabchif[i].innerText = i + 1;
            }
        }

        let timer;

        function Timer()
        {
            let s = 1;
            let m = 0;
            let h = 0;
            let sec;
            let min;
            let hrs;
		    let chrono = document.getElementById("chrono");

            function Chrono()
            {
                if (s == 60)
                {
                    s = 0;
                    m++;
                    if (m == 60)
                    {
                        m = 0;
                        h++;
                    }
                }

                if (s <= 9) sec = "0" + s;
                else sec = s;
                if (m <= 9) min = "0" + m;
                else min = m;
                if (h <= 9) hrs = "0" + h;
                else hrs = h;
                chrono.innerText = hrs + ":" + min + ":" + sec;

                s++;
            }
            
            timer = setInterval(Chrono, 1000);
        }

        function Start()
        {
            // Inversion_Alphabet(grille);
            // Inversion_PL(grille);
            // Inversion_GL(grille);
            // Inversion_PC(grille);
            // Inversion_GC(grille);
            // let r = Math.floor(Math.random() * 4);
            // Rotation(grille,r);
            Remplir(grille);
            Chiffres();
            //Grille initialisée avec les chiffres de départ mélangés et les autres cases vides + tableau de chiffres initialisé
            Selection_Cellule();
            //Chaque case vide de la grille peut réagir à un click
            Remplir_Cellule();
            //Chaque case du tableau de chiffres peut réagir à un click
            Effacer_Cellule();
            Timer();
        }

        //document.getElementById("gen").onclick=function(){Start()};
        document.getElementById("gen").addEventListener("click", Start);

        let g_td_grille = document.querySelectorAll("#grille td");
        let g_td_chiffres = document.querySelectorAll("#chiffres td");
        let cell = null;

        function Selection_Cellule()
        {   
            for (let i = 0; i < g_td_grille.length; i++)
            {
                if (g_td_grille[i].textContent == "")
                {
                    g_td_grille[i].addEventListener("click", function Coul_Case()
                    {
                        if (cell != null)
                        {
                            g_td_grille[cell].style.backgroundColor = "white";
                        }
                        cell = i; //Prend le focus sur i
                        g_td_grille[cell].style.backgroundColor = "grey";
                    }
                    );
                }
            }
        }

        function Remplir_Cellule()
        {
            for (let i = 0; i < g_td_chiffres.length; i++)
            {
                g_td_chiffres[i].addEventListener("click", function Inser_Chiffre()
                {
                    g_td_grille[cell].innerText = g_td_chiffres[i].textContent; //Insère le texte de la case cliquée du tableau de chiffres dans la case courante de la grille
                    //Vérifier la validité du chiffre inséré
                    let num_lig = Math.floor(cell / 9);
                    let num_col = cell % 9;
                    let chiffre_valide = true;
                    //Vérifier s'il y a un chiffre identique dans la même colonne
                    for (let j = 0 ; j < 9 ; j++)
                    {
                        if (g_td_grille[cell].textContent == g_td_grille[num_col + 9 * j].textContent)
                        {
                            if (cell == num_col + 9 * j) continue;
                            else
                            {
                                setTimeout(function Inva_Colonne()
                                {
                                    alert("Il y a déjà un " + g_td_chiffres[i].textContent + " dans cette colonne !");
                                    chiffre_valide = false;
                                },10);
                                break;
                            }
                        }
                           
                    }
                    //Vérifier s'il y a un chiifre identique dans la même ligne
                    for (let j = 0 ; j < 9 ; j++)
                    {
                        if (g_td_grille[cell].textContent == g_td_grille[num_lig * 9 + j].textContent)
                        {
                            if (cell == num_lig * 9 + j) continue;
                            else
                            {
                                setTimeout(function Inva_Ligne()
                                {
                                    alert("Il y a déjà un " + g_td_chiffres[i].textContent + " dans cette ligne !");
                                    chiffre_valide = false;
                                },10);
                                break;
                            }
                        }
                           
                    }
                    //Vérifier s'il y a un chiifre identique dans la même zone
                    let x_0 = Math.floor(cell / (9 * 3)); // Valeurs possibles de x_0 = 0, 1 ou 2
                    let y_0 = Math.floor((cell % 9) / 3); // Valeurs possibles de y_0 = 0, 1 ou 2
                    let index_0 = 9 * x_0 + y_0;
                    let cell_depart_zone = index_0 * 3;
                    for (let l = 0; l < 3; l++)
                    {
                        for (let c = 0; c < 3; c++)
                        {
                            let index_courant_zone = cell_depart_zone + (l * 9 + c);
                            if (g_td_grille[cell].textContent == g_td_grille[index_courant_zone].textContent)
                            {
                                if (cell == index_courant_zone) continue;
                                else
                                {
                                    setTimeout(function Inva_Zone()
                                    {
                                        alert("Il y a déjà un " + g_td_chiffres[i].textContent + " dans cette zone !");
                                        chiffre_valide = false;
                                    },10);
                                    break;
                                }
                                
                            }
                        }
                    }
                    
                    setTimeout(function Message_Victoire()
                    {
                        if (chiffre_valide == false)
                        {
                            g_td_grille[cell].innerText = "";
                        }
                        else
                        {
                            let victoire = true;
                            for (let v = 0; v < 81; v++)
                            {
                                if (g_td_grille[v].textContent == "")
                                {
                                    victoire = false;
                                    break;
                                }
                            }
                            if (victoire == true)
                            {
                                
                                alert("Bonjour, je m'appelle Javascript, et je suis claqué au sol ! =D");
                            }
                        }
                    }, 10);
                });
            }
        }

        function Effacer_Cellule()
        {
            b_del = document.getElementById("del");
            b_del.addEventListener("click", function()
            {
                g_td_grille[cell].innerText = "";
            });
        }

        function Victoire()
        {
            g_td_chiffres[i].addEventListener("click", Inser_Chiffre()),
            g_td_grille[cell].style.backgroundColor = "white";
            clearInterval(timer);
        }