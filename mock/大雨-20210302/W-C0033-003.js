export default `
<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
    
    <identifier>CWB-Weather_extremely-rain_202103021550002</identifier>
    <sender>weather@cwb.gov.tw</sender>
    <sent>2021-03-02T16:06:01+08:00</sent>
    <status>Actual</status>
    <msgType>Update</msgType>
    <scope>Public</scope>
    <references>weather@cwb.gov.tw,CWB-Weather_extremely-rain_202103021550001,2021-03-02T15:59:25+08:00 weather@cwb.gov.tw,CWB-Weather_extremely-rain_202103021220001,2021-03-02T12:28:05+08:00</references>
    <info>
        <language>zh-TW</language>
        <category>Met</category>
        <event>降雨</event>
        <responseType>Monitor</responseType>
        <urgency>Future</urgency>
        <severity>Moderate</severity>
        <certainty>Likely</certainty>
        <eventCode>
            <valueName>profile:CAP-TWP:Event:1.0</valueName>
            <value>rainfall</value>
        </eventCode>
        <effective>2021-03-02T15:50:00+08:00</effective>
        <onset>2021-03-02T15:53:00+08:00</onset>
        <expires>2021-03-02T23:00:00+08:00</expires>
        <senderName>中央氣象局</senderName>
        <headline>大雨特報</headline>
        <description>
東北季風影響，今（２）日基隆北海岸有局部大雨發生的機率，請注意。
        </description>
        <web>https://www.cwb.gov.tw/V8/C/P/Warning/FIFOWS.html</web>
        <parameter>
            <valueName>alert_title</valueName>
            <value>大雨特報</value>
        </parameter>
        <parameter>
            <valueName>severity_level</valueName>
            <value>大雨</value>
        </parameter>
        <parameter>
            <valueName>alert_color</valueName>
            <value>黃色</value>
        </parameter>
        <parameter>
            <valueName>website_color</valueName>
            <value>255,255,0</value>
        </parameter>
        
  <area>
            <areaDesc>基隆市安樂區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001706</value>
            </geocode>
        </area><area>
            <areaDesc>基隆市信義區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001707</value>
            </geocode>
        </area><area>
            <areaDesc>基隆市仁愛區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001704</value>
            </geocode>
        </area><area>
            <areaDesc>基隆市中山區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001705</value>
            </geocode>
        </area><area>
            <areaDesc>基隆市七堵區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001702</value>
            </geocode>
        </area><area>
            <areaDesc>新北市淡水區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6501000</value>
            </geocode>
        </area><area>
            <areaDesc>新北市瑞芳區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6501200</value>
            </geocode>
        </area><area>
            <areaDesc>基隆市中正區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001701</value>
            </geocode>
        </area><area>
            <areaDesc>新北市萬里區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6502800</value>
            </geocode>
        </area><area>
            <areaDesc>新北市三芝區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6502100</value>
            </geocode>
        </area><area>
            <areaDesc>新北市石門區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6502200</value>
            </geocode>
        </area><area>
            <areaDesc>基隆市暖暖區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>1001703</value>
            </geocode>
        </area><area>
            <areaDesc>新北市雙溪區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6502500</value>
            </geocode>
        </area><area>
            <areaDesc>新北市貢寮區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6502600</value>
            </geocode>
        </area><area>
            <areaDesc>新北市金山區</areaDesc>
            <geocode>
                <valueName>Taiwan_Geocode_103</valueName>
                <value>6502700</value>
            </geocode>
        </area>
    </info>

</alert>
`
