export const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Catálogo Ebserh</title>
</head>
<body>
    <h2>Catálogo de Produtos para Saúde Padronizados - Ebserh</h2>

    <div class="filters-container">
        <form method="GET" action="">
            <label for="grupo">Grupo:</label>
            <select name="grupo">
                <option value="">Todas</option>
                                    <option value="Acondicionamento e Embalagens Farmacêuticas"
                        >
                        Acondicionamento e Embalagens Farmacêuticas                    </option>
                                    <option value="Agulhas, Seringas E Cateteres (Equipos e Extensores)"
                        >
                        Agulhas, Seringas E Cateteres (Equipos e Extensores)                    </option>
                                    <option value="Anatomia Patológica"
                        >
                        Anatomia Patológica                    </option>
                                    <option value="Bacias e Cubas Gerais"
                        >
                        Bacias e Cubas Gerais                    </option>
                                    <option value="Balão Gastroenterológico"
                        >
                        Balão Gastroenterológico                    </option>
                                    <option value="Balão Urológico"
                        >
                        Balão Urológico                    </option>
                                    <option value="Biologia Molecular"
                        >
                        Biologia Molecular                    </option>
                                    <option value="Bioquímica"
                        >
                        Bioquímica                    </option>
                                    <option value="Bomba de Infusão"
                        >
                        Bomba de Infusão                    </option>
                                    <option value="Cânulas, Drenos, Tubos E Sondas"
                        >
                        Cânulas, Drenos, Tubos E Sondas                    </option>
                                    <option value="Cirurgia Cardiovascular e Hemodinâmica"
                        >
                        Cirurgia Cardiovascular e Hemodinâmica                    </option>
                                    <option value="Colchão hospitalar"
                        >
                        Colchão hospitalar                    </option>
                                    <option value="Corantes"
                        >
                        Corantes                    </option>
                                    <option value="Coxins"
                        >
                        Coxins                    </option>
                                    <option value="Curativos e Estomias"
                        >
                        Curativos e Estomias                    </option>
                                    <option value="Fios Cirúrgicos, Clipes e Hemostáticos"
                        >
                        Fios Cirúrgicos, Clipes e Hemostáticos                    </option>
                                    <option value="Fórmulas nutricionais e insumos para sondário e lactário"
                        >
                        Fórmulas nutricionais e insumos para sondário e lactário                    </option>
                                    <option value="Ginecologia e Mastologia"
                        >
                        Ginecologia e Mastologia                    </option>
                                    <option value="Hematologia, Imumologia e Imunohematologia"
                        >
                        Hematologia, Imumologia e Imunohematologia                    </option>
                                    <option value="Instrumental Cirúrgico"
                        >
                        Instrumental Cirúrgico                    </option>
                                    <option value="Instrumental Laparoscopia"
                        >
                        Instrumental Laparoscopia                    </option>
                                    <option value="Insumos de Microbiologia"
                        >
                        Insumos de Microbiologia                    </option>
                                    <option value="Insumos Endoscópicos"
                        >
                        Insumos Endoscópicos                    </option>
                                    <option value="Insumos Hemodialíticos e Nefrológicos"
                        >
                        Insumos Hemodialíticos e Nefrológicos                    </option>
                                    <option value="Insumos para CEC - circulação extracorpórea"
                        >
                        Insumos para CEC - circulação extracorpórea                    </option>
                                    <option value="Insumos para CME"
                        >
                        Insumos para CME                    </option>
                                    <option value="Insumos para Coleta"
                        >
                        Insumos para Coleta                    </option>
                                    <option value="Insumos para Diagnóstico por Imagem"
                        >
                        Insumos para Diagnóstico por Imagem                    </option>
                                    <option value="Insumos para Reabilitação"
                        >
                        Insumos para Reabilitação                    </option>
                                    <option value="Materiais Especiais"
                        >
                        Materiais Especiais                    </option>
                                    <option value="Material Cardiovascular"
                        >
                        Material Cardiovascular                    </option>
                                    <option value="Material Cirurgia Plástica"
                        >
                        Material Cirurgia Plástica                    </option>
                                    <option value="Material de Bucomaxilofacial"
                        >
                        Material de Bucomaxilofacial                    </option>
                                    <option value="Material de Equipamentos"
                        >
                        Material de Equipamentos                    </option>
                                    <option value="Material de Gastroenterologia"
                        >
                        Material de Gastroenterologia                    </option>
                                    <option value="Material de Neurologia"
                        >
                        Material de Neurologia                    </option>
                                    <option value="Material de Odontologia"
                        >
                        Material de Odontologia                    </option>
                                    <option value="Material de Oftalmologia"
                        >
                        Material de Oftalmologia                    </option>
                                    <option value="Material de Ortopedia"
                        >
                        Material de Ortopedia                    </option>
                                    <option value="Material de Otorrino"
                        >
                        Material de Otorrino                    </option>
                                    <option value="Material de Psicologia"
                        >
                        Material de Psicologia                    </option>
                                    <option value="Material de Radioterapia"
                        >
                        Material de Radioterapia                    </option>
                                    <option value="Material de Urologia"
                        >
                        Material de Urologia                    </option>
                                    <option value="Material Médico de Alta Durabilidade"
                        >
                        Material Médico de Alta Durabilidade                    </option>
                                    <option value="Material Médico Hospitalar-MMH"
                        >
                        Material Médico Hospitalar-MMH                    </option>
                                    <option value="Material Químico"
                        >
                        Material Químico                    </option>
                                    <option value="Material Respiratório"
                        >
                        Material Respiratório                    </option>
                                    <option value="Paramentação Assistencial"
                        >
                        Paramentação Assistencial                    </option>
                                    <option value="Plasmaférese"
                        >
                        Plasmaférese                    </option>
                                    <option value="Tela Cirúrgica"
                        >
                        Tela Cirúrgica                    </option>
                                    <option value="Vidrarias e Utensílios Gerais"
                        >
                        Vidrarias e Utensílios Gerais                    </option>
                            </select>

            <label for="hospital">Hospital:</label>
            <select name="hospital">
                <option value="">Todos</option>
                                    <option value="CH-UFC"
                        >
                        CH-UFC                    </option>
                                    <option value="CH-UFRJ"
                        >
                        CH-UFRJ                    </option>
                                    <option value="CHC-UFPR"
                        >
                        CHC-UFPR                    </option>
                                    <option value="CHU-UFPA"
                        >
                        CHU-UFPA                    </option>
                                    <option value="HC-UFG"
                        >
                        HC-UFG                    </option>
                                    <option value="HC-UFMG"
                        >
                        HC-UFMG                    </option>
                                    <option value="HC-UFPE"
                        >
                        HC-UFPE                    </option>
                                    <option value="HC-UFTM"
                        >
                        HC-UFTM                    </option>
                                    <option value="HC-UFU"
                        >
                        HC-UFU                    </option>
                                    <option value="HDT-UFT"
                        >
                        HDT-UFT                    </option>
                                    <option value="HE-UFPel"
                        >
                        HE-UFPel                    </option>
                                    <option value="Hospteste"
                        >
                        Hospteste                    </option>
                                    <option value="HU-FURG"
                        >
                        HU-FURG                    </option>
                                    <option value="HU-UFGD"
                        >
                        HU-UFGD                    </option>
                                    <option value="HU-UFJF"
                        >
                        HU-UFJF                    </option>
                                    <option value="HU-UFMA"
                        >
                        HU-UFMA                    </option>
                                    <option value="HU-UFPI"
                        >
                        HU-UFPI                    </option>
                                    <option value="HU-UFRR"
                        >
                        HU-UFRR                    </option>
                                    <option value="HU-UFS"
                        >
                        HU-UFS                    </option>
                                    <option value="HU-UFSC"
                        >
                        HU-UFSC                    </option>
                                    <option value="HU-UFSCAR"
                        >
                        HU-UFSCAR                    </option>
                                    <option value="HU-UNIFAP"
                        >
                        HU-UNIFAP                    </option>
                                    <option value="HU-UNIVASF"
                        >
                        HU-UNIVASF                    </option>
                                    <option value="HUAB-UFRN"
                        >
                        HUAB-UFRN                    </option>
                                    <option value="HUAC-UFCG"
                        >
                        HUAC-UFCG                    </option>
                                    <option value="HUAP-UFF"
                        >
                        HUAP-UFF                    </option>
                                    <option value="HUB-UNB"
                        >
                        HUB-UNB                    </option>
                                    <option value="HUCAM-UFES"
                        >
                        HUCAM-UFES                    </option>
                                    <option value="HUGG-UNIRIO"
                        >
                        HUGG-UNIRIO                    </option>
                                    <option value="HUGV-UFAM"
                        >
                        HUGV-UFAM                    </option>
                                    <option value="HUJB-UFCG"
                        >
                        HUJB-UFCG                    </option>
                                    <option value="HUJM-UFMT"
                        >
                        HUJM-UFMT                    </option>
                                    <option value="HUL-UFS"
                        >
                        HUL-UFS                    </option>
                                    <option value="HULW-UFPB"
                        >
                        HULW-UFPB                    </option>
                                    <option value="HUMAP-UFMS"
                        >
                        HUMAP-UFMS                    </option>
                                    <option value="HUOL-UFRN"
                        >
                        HUOL-UFRN                    </option>
                                    <option value="HUPAA-UFAL"
                        >
                        HUPAA-UFAL                    </option>
                                    <option value="HUPES-UFBA"
                        >
                        HUPES-UFBA                    </option>
                                    <option value="HUSM-UFSM"
                        >
                        HUSM-UFSM                    </option>
                                    <option value="MCO-UFBA"
                        >
                        MCO-UFBA                    </option>
                                    <option value="MEJC-UFRN"
                        >
                        MEJC-UFRN                    </option>
                                    <option value="Sede"
                        >
                        Sede                    </option>
                            </select>

            <label for="catmat">Catmat:</label>
            <input type="text" name="catmat" value="">

            <label for="codigo_ebserh">Código Ebserh:</label>
            <input type="text" name="codigo_ebserh" value="" placeholder="Somente números 1,99,123,144,9000">

            <label for="search">Pesquisar Descrição:</label>
            <input type="text" name="search" value="" placeholder="Ex: Agulha, Seringa...">

            <button type="submit">Filtrar</button>
        </form>
    </div>

    <table id="medTable">
        <tr>
            <th>Código Ebserh</th>
            <th>Catmat</th>
            <th>Descritivo</th>
            <th>Apresentação</th>
            <th>Categoria</th>
            <th>Subcategoria</th>
            <th>HUFs Utilizadores</th>
        </tr>
                    <tr>
                <td>EBS15550</td>
                <td>436293</td>
                <td> BROCA ODONTOLÓGICA BAIXA ROTAÇÃO nº 7, CARBIDE, contra-ângulo, formato esférica, haste regular, corte médio, em Aço inoxidável. Embalagem contendo identificação do produto, lote, data de fabricação, validade e registro na Anvisa. </td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material de Odontologia</td>
                <td>HU-UFSC</td>
            </tr>
                    <tr>
                <td>EBS15274</td>
                <td>438055</td>
                <td> Compressa CIRÚRGICA, ESTÉRIL, DESCARTÁVEL, MEDINDO APROXIMADAMENTE 25 X 30 CM, COM ALÇA E ELEMENTO RADIOPACO, com mínimo de 18 cm. MATERIAL 100% ALGODÃO, 15 FIOS por cm². Compressa pré lavadas, com 4 camadas fixadas entre si, na cor branca, bordas rebatidas com acabamento uniforme e cantos arredondados, trama regular e sem desprendimento de fios; textura macia e alta capacidade de absorção. Isenta de impurezas, amido, alvejantes, ópticos ou substância alergênica. Acondicionada em embalagem com selagem eficiente que garante a integridade do produto até o momento de sua utilização. Embalagem resistente, segura, com abertura asséptica e sem liberação de partículas, contendo identificação do produto, validade e lote de fácil visualização. </td>
                <td>PACOTE</td>
                <td>Produtos para Saúde</td>
                <td>Paramentação Assistencial</td>
                <td>HC-UFU</td>
            </tr>
                    <tr>
                <td>EBS15233</td>
                <td>459221</td>
                <td> Kit CATETER BALÃO OCLUSOR + fio guia hidrofílico. Composto por: cateter balão para oclusão vascular temporária, SHAFT proximal reforçado em AÇO INOXIDÁVEL, DIMENSÕES: de 4 e 5 mm (diâmetro) x 10 a 30 mm (comprimento); fio guia com revestimento hidrofílico, dimensões: 0,010 polegadas (diâmetro) x 150 cm (comprimento). Embalagem individual, resistente, com abertura asséptica, contendo identificação do produto, lote e validade de fácil visualização. Possuir registro na Anvisa/MS.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Cirurgia Cardiovascular e Hemodinâmica</td>
                <td>HUAP-UFF</td>
            </tr>
                    <tr>
                <td>EBS15553</td>
                <td>465127</td>
                <td> PINÇA para VÍDEOCIRURGIA, fenestrada para ALÇA INTESTINAL, haste isolada de 5 MM X 35 CM, (+-/1 CM) BOCA DE 30 MM, SIMPLES AÇÃO, SEM CREMALHEIRA. Material AÇO INOXIDÁVEL, autoclavável. Embalagem contendo identificação do produto, lote, data de fabricação, validade e registro na Anvisa.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>HU-UFSC, HUGV-UFAM</td>
            </tr>
                    <tr>
                <td>EBS15552</td>
                <td>465127</td>
                <td> PINÇA para VÍDEOCIRURGIA, fenestrada para ALÇA INTESTINAL, haste isolada of 5 MM X 36 CM, BOCA DE 30 MM, DUPLA AÇÃO, SEM CREMALHEIRA. Material AÇO INOXIDÁVEL, autoclavável. Embalagem contendo identificação do produto, lote, data de fabricação, validade e registro na Anvisa.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>CHC-UFPR, HE-UFPel, HU-UFSC, HUGV-UFAM</td>
            </tr>
                    <tr>
                <td>EBS15554</td>
                <td>613711</td>
                <td> PINÇA VIDEOCIRURGICA, para BIÓPSIA. 5 FR X 34 cm de comprimento. Aplicação: HISTEROSCÓPIA. Embalagem individual contendo dados de identificação, procedência, número de lote, data de fabricação, validade do produto e registro na Anvisa/MS. Compatível com equipamento especificado em edital.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>HE-UFPel, HU-UFPI, HU-UFSC</td>
            </tr>
                    <tr>
                <td>EBS15555</td>
                <td>465192</td>
                <td> PINÇA VIDEOCIRURGICA, para BIÓPSIA. Aplicação: BRONCOSCÓPIA. FORMATO CONCHA OVAL, SEM ESPÍCULA. Compatível com CANAL DE 1.8 MM. Aproximadamente 150 CM de COMPRIMENTO. Embalagem individual contendo dados de identificação, procedência, número de lote, data de fabricação, validade do produto e registro na Anvisa/MS.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>HU-UFPI, HU-UFSC, HUMAP-UFMS</td>
            </tr>
                    <tr>
                <td>EBS15557</td>
                <td>486692</td>
                <td> PINÇA VIDEOCIRURGICA, para BIÓPSIA. TIPO JACARÉ. APLICAÇÃO BRONCOSCOPIA. Compatível com CANAL DE 2.0 MM. Embalagem individual contendo dados de identificação, procedência, número de lote, data de fabricação, validade do produto e registro na Anvisa/MS.Compatível com equipamento especificado em edital.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>HU-UFSC, HUMAP-UFMS</td>
            </tr>
                    <tr>
                <td>EBN13932</td>
                <td>303065</td>
                <td>(Bicos mamadeiras) - Os bicos devem ser de silicone, material atóxico, antialérgico, inodoro, insípido, transparente e fácil de higienizar. Haverá necessidade de formatos diferentes para atender as diversas idades e necessidades específicas dos pacientes atendidos na instituição; formato ortodôntico, formato especial.disponíveis para casosde saúde específicos (lábio leporino, por exemplo), formato clássico que se assemelha ao seio materno. - Apresentação: Unidade. (Marcas de referência: Não informado).</td>
                <td>UNIDADE</td>
                <td>Produção e distribuição de refeições orais e enterais</td>
                <td>Fórmulas nutricionais e insumos para sondário e lactário</td>
                <td>HE-UFPel</td>
            </tr>
                    <tr>
                <td>EBN13935</td>
                <td>483046</td>
                <td>(Copo dosador) - Copo dosador estéril 80 ml (dosador oral, formato copo graduado, material polipropileno atóxico, volume total80 ml, característica adicional borda arredondada, com tampa de pressão). - Apresentação: Unidade. (Marcas de referência: Não informado).</td>
                <td>UNIDADE</td>
                <td>Produção e distribuição de refeições orais e enterais</td>
                <td>Fórmulas nutricionais e insumos para sondário e lactário</td>
                <td>HE-UFPel</td>
            </tr>
                    <tr>
                <td>EBN13937</td>
                <td>357114</td>
                <td>(Mamadeiras e chucas - Mamadeira de material inquebrável, inodoro, esterilizável (autoclavável) e totalmente atóxico, com gargalo ultra higiênico, sem bordas ou rebarbas cortantes, não podendo ser de policarbonato ou vidro, com capacidadede 60 ml (chucas) e 240 ml (mamadeiras), transparente, lisa, com cor variadas (dois tipos), de cantos arredondados, graduada de 10 em 10 ml, com alto relevo com bico de silicone inodoro, insípido, temperatura de esterilização em autoclave 125°C. - Apresentação: Unidade. (Marcas de referência: Não informado).</td>
                <td>UNIDADE</td>
                <td>Produção e distribuição de refeições orais e enterais</td>
                <td>Fórmulas nutricionais e insumos para sondário e lactário</td>
                <td>HE-UFPel</td>
            </tr>
                    <tr>
                <td>EBS10995</td>
                <td>447369</td>
                <td>(PTFE) - ENXERTO TUBULAR VALVULAR POLITETRAFLUORETILENO DE 70 CM CALIBRE 10MM – RETO – LISO – BAIXA POROSIDADE – PRESENÇA DE LINHA GUIA – DE ALTA RESISTENCIA – ANELADO (SUPORTE EXTERNO) Em embalagem única, estéril, devidamente identificado com informações do fabricante e do produto, número de registro na Anvisa, nº do lote, data da fabricação e data da validade.-----Descritivo não Validado - Padrão-HUGV-UFAM.Será submetido a consulta pública-----|</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material Cardiovascular</td>
                <td>HC-UFTM, HU-UFSC, HUGV-UFAM</td>
            </tr>
                    <tr>
                <td>EBS10996</td>
                <td>447338</td>
                <td>(PTFE) - ENXERTO TUBULAR VALVULAR POLITETRAFLUORETILENO DE 70 CM CALIBRE 12MM – RETO – LISO – BAIXA POROSIDADE – PRESENÇA DE LINHA GUIA – DE ALTA RESISTENCIA – ANELADO (SUPORTE EXTERNO) Em embalagem única, estéril, devidamente identificado com informações do fabricante e do produto, número de registro na Anvisa, nº do lote, data da fabricação e data da validade.-----Descritivo não Validado - Padrão-HUGV-UFAM.Será submetido a consulta pública-----|</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material Cardiovascular</td>
                <td>HC-UFMG, HC-UFTM, HUGV-UFAM</td>
            </tr>
                    <tr>
                <td>EBS07236</td>
                <td>376764</td>
                <td>1-naftol. Aspecto: pó cristalino ou escamas brancas a amareladas; fórmula química C₁₀H₇OH; peso molecular 144,17 g/mol; grau de pureza mínima de 99%. Características adicionais: reagente p.a.; cas 90-15-3.</td>
                <td>GRAMA</td>
                <td>Produtos para Saúde</td>
                <td>Material Químico</td>
                <td>CHC-UFPR, HU-UFJF</td>
            </tr>
                    <tr>
                <td>EBS00481</td>
                <td>423465</td>
                <td>Abaixador de LÍNGUA DE MADEIRA, DIMENSÕES: aproximadamente, 14 (+/- 02) cm de comprimento, 1,4 (+/- 0,2) cm de largura e 0,2 (+/- 0,05) cm de espessura; apresenta cor NATURAL; com superfície lisa e insipida; formato convencional, com extremidades arredondadas, superfícies e bordas perfeitamente acabadas; espessura e largura uniformes em toda a sua extensão; atóxica, livre de resíduos e impurezas e com resistência que propicie manuseio seguro. Não estéril, descartável. Embalagem externa segura, com identificação do produto, validade e lote. Embalado individualmente; pacote contendo 100 unidades.</td>
                <td>PACOTE</td>
                <td>Produtos para Saúde</td>
                <td>Material Médico Hospitalar-MMH</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HDT-UFT, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFRR, HU-UFS, HU-UFSC, HU-UFSCAR, HU-UNIFAP, HU-UNIVASF, HUAB-UFRN, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJB-UFCG, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS10440</td>
                <td>445860</td>
                <td>Acessório de incubadora neonatal hospitalar, tipo: FILTRO DE AR, aplicação: retenção de partículas finas. Compatível com modelo e incubadora especificada em edital.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material de Equipamentos</td>
                <td>CH-UFC, HC-UFPE, HU-FURG, HUB-UNB, HUGG-UNIRIO, HUJM-UFMT, HULW-UFPB</td>
            </tr>
                    <tr>
                <td>EBS02263</td>
                <td>479641</td>
                <td>Adaptador PARA COLETA DE SANGUE À VÁCUO, MODELO PADRÃO. Para encaixe em tubos, rosqueado para agulha, material: polipropileno. Atóxico, descartável, não estéril.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Agulhas, Seringas E Cateteres (Equipos e Extensores)</td>
                <td>CH-UFRJ, HC-UFU, HDT-UFT, HE-UFPel, HU-FURG, HU-UFJF, HU-UFS, HU-UFSC, HU-UFSCAR, HU-UNIVASF, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUJB-UFCG, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUPAA-UFAL, HUSM-UFSM, MCO-UFBA</td>
            </tr>
                    <tr>
                <td>EBS02389</td>
                <td>437888</td>
                <td>ADESIVO CIRÚRGICO de derivados de CIANOACRILATO; 1 mg/ml; líquido tópico ESTÉRIL. Para coaptação de peles sensíveis e pequenas incisões, deve fazer o fechamento rápido do ferimento, indolor, biocompatível, estéril. Embalagem individual com abertura e transferência asséptica, identificação do produto, data de fabricação, validade e lote. Deve apresentar RMS. Apresentação: AMPOLA COM CERCA DE 0,5 ml.</td>
                <td>AMPOLA</td>
                <td>Produtos para Saúde</td>
                <td>Fios Cirúrgicos, Clipes e Hemostáticos</td>
                <td>CH-UFRJ, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFU, HDT-UFT, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UNIVASF, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS04523</td>
                <td>474118</td>
                <td>AFASTADOR cirúrgico, tipo FARABEUF, LÂMINA cerca de 06 mm, COMPRIMENTO cerca de 100 mm. Material AÇO INOXIDÁVEL, autoclavável até 135 °C. Com compatibilidade para sistema de rastreabilidade. Lote, logomarca do fabricante e as iniciais do hospital, utilizando método a laser.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFPE, HC-UFU, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFSC, HU-UFSCAR, HU-UNIVASF, HUAB-UFRN, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, MCO-UFBA</td>
            </tr>
                    <tr>
                <td>EBS00002</td>
                <td>397513</td>
                <td>Agulha HIPODÉRMICA 13 x 0,45 mm (26 G 1/2). Cânula de aço inoxidável reta, parede fina, siliconada, bisel trifacetado, canhão translúcido com adaptação universal, livre de rebarbas e resíduos de manufatura do aço, atóxico, encaixe seguro e protetor de encaixe firme. COM SISTEMA DE SEGURANÇA acoplado à agulha e segundo NR32. Estéril. Descartável. Embalagem individual resistente com abertura em pétala asséptica, contendo a identificação do produto, lote e validade de fácil visualização.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Agulhas, Seringas E Cateteres (Equipos e Extensores)</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HDT-UFT, HE-UFPel, Hospteste, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFRR, HU-UFS, HU-UFSC, HU-UFSCAR, HU-UNIFAP, HU-UNIVASF, HUAB-UFRN, HUAC-UFCG, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJB-UFCG, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS03064</td>
                <td>439888</td>
                <td>Agulha DE FÍSTULA ARTÉRIO VENOSA 16 G, com dispositivos: SEGURANÇA, CORTA FLUXO E BACK EYE. Cânula em aço reta siliconizada, paredes finas, bisel trifacetado e afiado com orifício em face posterior, e capa protetora. Aleta anatômica, tubo extensor, transparente, PVC, incolor, flexível, com 30 cm DE COMPRIMENTO (+/-3 cm) e DIÂMETRO DE 25 mm (+/-3 cm), pinça corta fluxo. Conector fêmea rígido rosqueável com tampa protetora. Material resistente, atóxico, isento de resíduos e impurezas, de manuseio fácil e seguro. ESTÉRIL, biocompatível, de uso único. Embalagem resistente, com abertura e transferência asséptica, identificação do produto, validade e lote.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos Hemodialíticos e Nefrológicos</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFRR, HU-UFS, HU-UFSC, HU-UFSCAR, HU-UNIFAP, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS05124</td>
                <td>603055</td>
                <td>Agulha PARA BIÓPSIA DE TECIDOS MOLES tipo TRUCUT, 18 G x 250 mm, COM PENETRAÇÃO DE 18 mm a 25 mm; deve ser UTILIZADA EM PISTOLA 2.2, AUTOMÁTICA; conexão luer slip; cânula e mandril COM PONTA BISELADA; cânula e mandril confeccionados EM AÇO INOXIDÁVEL; mandril com GAVETA DE 19 a 22 mm para retirada da amostra; cânula externa com marcação centímetro a centímetro para facilitar a localização precisa da área de interesse; PONTA ECOGÊNICA. DESCARTÁVEL. USO ÚNICO. deve ser visível ao ultrassom; deve estar embalado em material que promova barreira microbiana com abertura asséptica de fácil manuseio; a embalagem deve ter os dados de identificação, procedência, número do lote e número do RMS, conforme legislação vigente na Anvisa.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Agulhas, Seringas E Cateteres (Equipos e Extensores)</td>
                <td>CH-UFC, CHU-UFPA, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HDT-UFT, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUJM-UFMT, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA</td>
            </tr>
                    <tr>
                <td>EBS00592</td>
                <td>436810</td>
                <td>Amniótomo, ROMPEDOR DE BOLSA AMNIÓTICA, material com ponta adequada para procedimento de ruptura de bolsa. Tamanho 25 cm (+/-5 cm), em plástico atóxico, apirogênico, estéril, descartável. Embalagem individual com dados de identificação, procedência, fabricação, validade e registro no MS.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material Médico Hospitalar-MMH</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFMG, HC-UFPE, HC-UFTM, HE-UFPel, HU-FURG, HU-UFGD, HU-UFMA, HU-UFS, HU-UFSC, HUAB-UFRN, HUAP-UFF, HUCAM-UFES, HUGG-UNIRIO, HULW-UFPB, HUMAP-UFMS, HUPAA-UFAL, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS09110</td>
                <td>441230</td>
                <td>INDICADOR BIOLÓGICO para controle de esterilização a vapor, autoclave, leitura rápida (3 horas), contendo esporos de Geobacillus stearothermophilus. Ampola autocontida com indicador de processo químico na etiqueta. Caixas com 50 unidades. Para uso no setor CME.</td>
                <td>CAIXA</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para CME</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HDT-UFT, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFRR, HU-UFS, HU-UFSC, HU-UFSCAR, HU-UNIFAP, HU-UNIVASF, HUAB-UFRN, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJB-UFCG, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS09115</td>
                <td>441235</td>
                <td>FITA INDICADORA CLASSE 1 para monitoramento de pacotes submetidos a processo de esterilização a vapor em autoclave, adesiva, com listras indicadoras químicas que mudam de cor após exposição ao calor e umidade, rolo de 19 mm x 50 m. Para uso na CME (Central de Materiais).</td>
                <td>ROLO</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para CME</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS09120</td>
                <td>441240</td>
                <td>DETERGENTE ENZIMÁTICO concentrado, contendo 5 enzimas (amilase, protease, celulase, lipase e peptidase), para limpeza de instrumentais cirúrgicos e endoscópicos por imersão manual ou automatizada. Altamente biodegradável, pH neutro. Frasco com 1 litro. Para uso na CME.</td>
                <td>FRASCO</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para CME</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS09130</td>
                <td>441250</td>
                <td>PAPEL GRAU CIRÚRGICO com filme plástico transparente para esterilização em autoclave a vapor ou óxido de etileno (ETO), em formato de bobina tubular, dimensões: 15 cm x 100 m, com indicador químico de processo integrado nas bordas. Para CME.</td>
                <td>BOBINA</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para CME</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS01110</td>
                <td>412345</td>
                <td>FIO DE SUTURA NYLON PRETO 3-0 agulhado, agulha circular 3/8, corte triangular de 2,5 cm, fio monofilamentar de 45 cm de comprimento. Estéril, descartável, alta resistência tensil. Caixa com 36 envelopes para Centro Cirúrgico.</td>
                <td>CAIXA</td>
                <td>Produtos para Saúde</td>
                <td>Fios Cirúrgicos, Clipes e Hemostáticos</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJB-UFCG, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS04530</td>
                <td>474125</td>
                <td>PINÇA CIRÚRGICA DE BACKHAUS para fixação de campos cirúrgicos, confeccionada em aço inoxidável cirúrgico, autoclavável até 135 °C, tamanho 13 cm, com trava de cremalheira e pontas agulhadas. Para Centro Cirúrgico.</td>
                <td>UNIDADE</td>
                <td>Instrumentais Cirúrgicos</td>
                <td>Instrumental Cirúrgico</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFMG, HC-UFPE, HC-UFU, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS08110</td>
                <td>432110</td>
                <td>FILME RADIOGRÁFICO DE DUPLA EMULSÃO, sensível ao verde (green-sensitive), dimensões: 35 x 35 cm, para diagnóstico por imagem em aparelhos de raio-x fixo e exames radiológicos convencionais. Caixa com 100 películas.</td>
                <td>CAIXA</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para Diagnóstico por Imagem</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS08120</td>
                <td>432115</td>
                <td>CONTRASTE RADIOLÓGICO IODADO não iônico 300 mg/ml, frasco com 50 ml, indicado para exames radiográficos convencionais de raio-x fixo, urografias, tomografia computadorizada e angiografias. Registro na Anvisa.</td>
                <td>FRASCO</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para Diagnóstico por Imagem</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS08210</td>
                <td>432220</td>
                <td>GEL CONDUTOR PARA ULTRASSOM, hipoalergênico, pH neutro, incolor, excelente condutibilidade acústica, não ataca o transdutor da ultrassonografia portátil. Bag flexível de 5 kg para recarga de frascos com bico aplicador.</td>
                <td>BAG</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para Diagnóstico por Imagem</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HDT-UFT, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFRR, HU-UFS, HU-UFSC, HU-UFSCAR, HU-UNIFAP, HU-UNIVASF, HUAB-UFRN, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJB-UFCG, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS08220</td>
                <td>432225</td>
                <td>AGULHA ECOGÊNICA PARA BIÓPSIA tipo CHIBA, de 22G x 15cm, com ponta altamente reflexiva com ranhuras em espiral para máxima visualização e rastreamento seguro em procedimentos guiados por ultrassonografia portátil. Estéril.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para Diagnóstico por Imagem</td>
                <td>CH-UFC, CHU-UFPA, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUJM-UFMT, HUMAP-UFMS, HUOL-UFRN</td>
            </tr>
                    <tr>
                <td>EBS07110</td>
                <td>435110</td>
                <td>SONDA DE GASTROSTOMIA PERCUTÂNEA (PEG) confeccionada em 100% silicone de grau médico, de 20 Fr, com balão de retenção interna de 5ml, via de alimentação, via de irrigação de balão e anel de fixação externa. Estéril. Para endoscopia.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos Endoscópicos</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS07120</td>
                <td>435115</td>
                <td>PINÇA DE BIÓPSIA ENDOSCÓPICA descartável, com agulha central, diâmetro de 2.3 mm, comprimento de 180 cm, mandíbulas tipo copo oval com bordas afiadas para endoscopia digestiva alta e colonoscopia. Estéril, uso único.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos Endoscópicos</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS05210</td>
                <td>438110</td>
                <td>AGULHA DE ASPIRAÇÃO TRANSBRÔNQUICA (TBNA) para broncoscopia pulmonar, de 21G, com bainha protetora de teflon e ponta ecogênica, comprimento de 120 cm, compatível com canal de biópsia de broncoscópio flexível. Estéril.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material Respiratório</td>
                <td>CH-UFC, CH-UFRJ, HC-UFMG, HC-UFPE, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HUAP-UFF, HUGG-UNIRIO, HUGV-UFAM, HULW-UFPB, HUMAP-UFMS, HUPES-UFBA</td>
            </tr>
                    <tr>
                <td>EBS05220</td>
                <td>438115</td>
                <td>PINÇA DE BIÓPSIA BRONCOSCÓPICA flexível, ponta tipo concha oval serrilhada, diâmetro de 1.8 mm, comprimento de 120 cm, de uso único, compatível com o canal de biópsia de broncoscopia. Embalagem estéril.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material Respiratório</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFPE, HC-UFU, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA</td>
            </tr>
                    <tr>
                <td>EBS03110</td>
                <td>439110</td>
                <td>CONCENTRADO ÁCIDO PARA HEMODIÁLISE com sódio, potássio 2.0 mEq/l, cálcio 3.0 mEq/l, magnésio 1.0 mEq/l, dextrose 100 mg/dl, galão de 5 litros, formulado para diálise peritoneal e hemodiálise beira-leito.</td>
                <td>GALÃO</td>
                <td>Produtos para Saúde</td>
                <td>Insumos Hemodialíticos e Nefrológicos</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS03120</td>
                <td>439115</td>
                <td>DIALISADOR CAPILAR DE ALTO FLUXO em membrana de polisulfona de alta biocompatibilidade, área de superfície de 1.8 m², esterilizado a vapor, coeficiente de ultrafiltração elevado para nefrologia e hemodiálise beira-leito.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos Hemodialíticos e Nefrológicos</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS06110</td>
                <td>440110</td>
                <td>BOLSA DE SANGUE TRIPLA para coleta de sangue total e fracionamento de componentes (concentrado de hemácias, plaquetas e plasma), contendo solução conservadora e anticoagulante CPDA-1, capacidade para 450ml. Agência Transfusional.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Hematologia, Imumologia e Imunohematologia</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS06120</td>
                <td>440115</td>
                <td>CARTÃO EM GEL PARA IMUNOHEMATOLOGIA contendo 6 microbujões com anticorpos monoclonais para tipagem sanguínea direta de grupos ABO, fator Rh (D) e pesquisa de anticorpos irregulares (PAI) por aglutinação em coluna. Agência Transfusional.</td>
                <td>CAIXA</td>
                <td>Produtos para Saúde</td>
                <td>Hematologia, Imumologia e Imunohematologia</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS12110</td>
                <td>450110</td>
                <td>FÓRMULA NUTRICIONAL ENTERAL POLIMÉRICA, nutricionalmente completa, hipercalórica (1.5 kcal/ml), normoproteica, com adição de fibras solúveis e insolúveis, isenta de glúten e lactose, embalada em sistema fechado de 1000ml. Sondário.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Fórmulas nutricionais e insumos para sondário e lactário</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUSM-UFSM, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS12120</td>
                <td>450115</td>
                <td>EQUIPO DE NUTRIÇÃO ENTERAL compatível com bomba de infusão, via única, conexão distal escalonada em Y com tampa, pinça corta-fluxo tipo rolete, filtro de ar hidrofóbico e bacteriológico. Uso em sondário e terapia de nutrição.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Fórmulas nutricionais e insumos para sondário e lactário</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
                    <tr>
                <td>EBS08310</td>
                <td>432310</td>
                <td>CHAPA RADIOGRÁFICA MÓVEL (CR CASSETE IP), tamanho 35 x 43 cm, com tela de fósforo fotoestimulável de alta resolução e sensibilidade, para diagnóstico por imagem em exames de leito com aparelho de raio-x móvel.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para Diagnóstico por Imagem</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS08320</td>
                <td>432315</td>
                <td>BIOMBO DE CHUMBO PLUMBÍFERO MÓVEL estruturado sobre rodízios com travas, visor de vidro plumbífero de 10 x 15 cm, equivalência de 1.5 mm Pb para proteção radiológica de profissionais em procedimentos de raio-x móvel no leito.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Insumos para Diagnóstico por Imagem</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFPE, HC-UFU, HE-UFPel, HU-FURG, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAC-UFCG, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUJM-UFMT, HUL-UFS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA</td>
            </tr>
                    <tr>
                <td>EBS11110</td>
                <td>460110</td>
                <td>PASTA CONDUTORA PARA EEG (eletroencefalografia) e mapeamento cerebral, altamente fixadora de eletrodos, solúvel em água, inodora, antialérgica, de excelente condutibilidade elétrica. Pote com 1 kg.</td>
                <td>POTE</td>
                <td>Produtos para Saúde</td>
                <td>Material de Neurologia</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFS, HU-UFSC, HU-UFSCAR, HUAP-UFF, HUB-UNB, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUSM-UFSM</td>
            </tr>
                    <tr>
                <td>EBS11120</td>
                <td>460115</td>
                <td>ELETRODO DE DISCO EM PRATA CLORADA (Ag-AgCl) reutilizável para exames de eletroencefalografia EEG, com cabo flexível de 1.5 metros, isolamento em silicone, com conector tipo touch-proof de segurança de 1.5 mm.</td>
                <td>UNIDADE</td>
                <td>Produtos para Saúde</td>
                <td>Material de Neurologia</td>
                <td>CH-UFC, CH-UFRJ, CHC-UFPR, CHU-UFPA, HC-UFG, HC-UFMG, HC-UFPE, HC-UFTM, HC-UFU, HE-UFPel, HU-FURG, HU-UFGD, HU-UFJF, HU-UFMA, HU-UFPI, HU-UFS, HU-UFSC, HU-UFSCAR, HUAB-UFRN, HUAP-UFF, HUB-UNB, HUCAM-UFES, HUGG-UNIRIO, HUGV-UFAM, HUL-UFS, HULW-UFPB, HUMAP-UFMS, HUOL-UFRN, HUPAA-UFAL, HUPES-UFBA, HUSM-UFSM, MCO-UFBA, MEJC-UFRN</td>
            </tr>
            </table>

    <p>Total de resultados: <strong>12512</strong></p>
</body>
</html>`;
