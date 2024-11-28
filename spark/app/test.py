from pyspark.sql import SparkSession

def main():
    # Créez une session Spark
    spark = SparkSession.builder \
        .appName('Test Spark Submit') \
        .getOrCreate()

    # Chargez le fichier CSV
    input_file = 'test_data.csv'
    output_path = 'output'

    df = spark.read.option('header', 'true').csv(input_file)

    # Transformation : comptez les occurrences par valeur
    result = df.groupBy('value').count()

    # Affichez les résultats dans la console
    result.show()

    # Sauvegardez les résultats dans un fichier (format CSV)
    result.write.mode('overwrite').csv(output_path)

    # Arrêtez la session Spark
    spark.stop()

if __name__ == '__main__':
    main()